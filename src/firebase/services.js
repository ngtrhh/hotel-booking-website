import firebase, { db } from "./config";
import { doc, setDoc, addDoc, collection  } from "firebase/firestore";
import { auth } from "./config";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();


export const LoginWithGgFb = (methodType) => {
	auth.signOut();
	let provider = '';
	if(methodType == 'Google'){
		provider = ggProvider;
	}
	if(methodType == 'Facebook'){
		provider = fbProvider;
	}


	signInWithPopup(auth, provider)
	.then((result) => {
		// The signed-in user info.
		const user = result.user;

		// This gives you a Facebook Access Token. You can use it to access the Facebook API.
		const credential = FacebookAuthProvider.credentialFromResult(result);
		const accessToken = credential.accessToken;

		// IdP data available using getAdditionalUserInfo(result)
		// ...
		if(getAdditionalUserInfo(result).isNewUser){
			const data = {
				uid: user.uid,
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				providerId: user.providerId,
				createdAt: user.metadata.createdAt,
				keywords: generateKeywords(user.displayName)
			}
			addDocument("users", data);
		}
	})
	.catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.customData.email;
		// The AuthCredential type that was used.
		const credential = FacebookAuthProvider.credentialFromError(error);

		// ...
	});
}

export const addDocument = async (collectionName, data) => {
	const docRef = await addDoc(collection(db, collectionName), {
		...data
	});
}

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName) => {
	// liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
	// => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
	if(displayName == null) {return null;}
	const name = displayName.toLowerCase().split(' ').filter((word) => word);
  
	const length = name.length;
	let flagArray = [];
	let result = [];
	let stringArray = [];
  
	/**
	 * khoi tao mang flag false
	 * dung de danh dau xem gia tri
	 * tai vi tri nay da duoc su dung
	 * hay chua
	 **/
	for (let i = 0; i < length; i++) {
	  flagArray[i] = false;
	}
  
	const createKeywords = (name) => {
	  const arrName = [];
	  let curName = '';
	  name.split('').forEach((letter) => {
		curName += letter;
		arrName.push(curName);
	  });
	  return arrName;
	};
  
	function findPermutation(k) {
	  for (let i = 0; i < length; i++) {
		if (!flagArray[i]) {
		  flagArray[i] = true;
		  result[k] = name[i];
  
		  if (k === length - 1) {
			stringArray.push(result.join(' '));
		  }
  
		  findPermutation(k + 1);
		  flagArray[i] = false;
		}
	  }
	}
  
	findPermutation(0);
  
	const keywords = stringArray.reduce((acc, cur) => {
	  const words = createKeywords(cur);
	  return [...acc, ...words];
	}, []);
  
	return keywords;
  };