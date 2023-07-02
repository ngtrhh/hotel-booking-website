import { Spin } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import useFireStore from '../Hooks/useFireStored';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

export const AuthContext = React.createContext();

export default function AuthProvider ({children}) {
	const [user, setUser] = useState({})
	const [uid, setUid] = useState('');
	let navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	React.useEffect(() => {

		const collectionRef = collection(db, 'users');

		const q = query(collectionRef, where('uid', '==', uid));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const userData = [];
			querySnapshot.forEach((doc) => {
				userData.push({
					...doc.data()
				});
			});
			setUser(userData[0]);
		});

		return unsubscribe;
	}, [uid]);

	React.useEffect(() => {
		const unsubscribed = auth.onAuthStateChanged((user) => {
			if(user){
				setUid(user.uid);
				setIsLoading(false);
				// navigate('/');
			}
			else{
				setUser({});
				setIsLoading(false);
				//navigate('/login');
			}
		});
		
		return () => {
			unsubscribed();
		}
	}, [useNavigate]);
	
	return (
		<AuthContext.Provider value={{user}}>
			{isLoading ? <Spin/> : children}
		</AuthContext.Provider>
	)
}
