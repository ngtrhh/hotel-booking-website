import React, { useState } from 'react'
import { db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { doc, onSnapshot, limit } from "firebase/firestore";

const useFireStore = (_collection, setData, limitData = 40, condition = '') => {
	const[documents, setDocuments] = useState([])
	React.useEffect(() => {

		const collectionRef = collection(db, _collection);

		const q = (condition != '') ?
			query(collectionRef, where(condition.fieldName, condition.operator, condition.comparedValue), limit(limitData))
		:
			query(collectionRef, limit(limitData));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const documents = [];
			querySnapshot.forEach((doc) => {
				documents.push({
					...doc.data(),
					'id': doc.id
				});
			});
			setData(documents);
		});

		return unsubscribe;
	}, [_collection, condition]);
}

export default useFireStore;
