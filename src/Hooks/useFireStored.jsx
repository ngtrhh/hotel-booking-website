import React, { useState } from 'react'
import { db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

const useFireStore = (_collection, condition) => {
	const[documents, setDocuments] = useState([])
	React.useEffect(() => {

		const collectionRef = collection(db, _collection);

		const q = query(collectionRef, where(condition.fieldName, condition.operator, condition.comparedValue));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const documents = [];
			querySnapshot.forEach((doc) => {
				documents.push({
					...doc.data(),
					'id': doc.id
				}
				);
			});
			setDocuments(documents);
		});

		return unsubscribe;
	}, [_collection, condition]);

	return documents;
}

export default useFireStore;
