import { Spin } from 'antd';
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import useFireStore from '../Hooks/useFireStored';
import { format, addDays, differenceInDays } from "date-fns";
import vi from "date-fns/locale/vi";

import { AuthContext } from './AuthProvider';
import { HomeContext } from './HomeContext';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/config';

export const AppContext = React.createContext();

export default function AppProvider ({children}) {

	//Data User
	const user = useContext(AuthContext).user;
	const [isLoggedIn, setIsLoggedIn] = useState((user) ? !(Object.keys(user).length === 0) : false);
	useEffect(() => {
		if(user){
			setIsLoggedIn(!(Object.keys(user).length === 0));
		}
	}, [user]);
	

	//Data Home
	const [searchPlaceValue, setSearchPlaceValue] = useState('TP. Hồ Chí Minh')
	const [searchDateRange, setSearchDateRange] = useState([
		{
		  startDate: new Date(),
		  endDate: addDays(new Date(), 1),
		  key: "selection",
		  showDateDisplay: false,
		},
	]);
	const [seacrchNumOfRooms, setSeacrchNumOfRooms] = useState(1);
	const [seacrchNumOfGuest, setSeacrchNumOfGuest] = useState(1);
	const [seacrchNumOfChild, setSeacrchNumOfChild] = useState(0);

	//Data Acccomodation
	const [accoms, setAccoms] = useState([]);

	const querySnapshot = getDocs(collection(db, "cities"));
	querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	console.log(doc.id, " => ", doc.data());
	});

	useEffect(() =>{
		console.log(seacrchNumOfRooms);
	}, [seacrchNumOfRooms]);
	
	// const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
	// const [isInviteVisible, setIsInviteVisible] = useState(false);
	// const [selectedRoomId, setSelectedRoomId] = useState('');
	// const [firstLoaded, setFirstLoaded] = useState(true);
	
	
	// const roomCondition = React.useMemo(() => {
	// 	return {
	// 		fieldName: 'members',
	// 		operator: 'array-contains',
	// 		comparedValue: user.uid ? user.uid : ''
	// 	}
	// }, [user.uid]);
	// const rooms= useFireStore('rooms', roomCondition);
	
	
	// const selectedRoom = React.useMemo(
	// 	() => rooms.find((room) => room.id === selectedRoomId), 
	// 	[rooms, selectedRoomId]
	// );
	
	// React.useEffect(() => {
	// 	if(rooms.length && firstLoaded){
	// 		setSelectedRoomId(rooms[0].id);
	// 		setFirstLoaded(false);
	// 	}
	// }, [rooms]);
	// const selectedRoomDepen= selectedRoom ? selectedRoom.members : [];

	// const userCondition = React.useMemo(() => {
	// 	return {
	// 		fieldName: 'uid',
	// 		operator: 'in',
	// 		comparedValue: selectedRoom ? selectedRoom.members : [''] 
	// 	}
	// }, [selectedRoom]);
	// const members = useFireStore('users', userCondition);
	
	return (
		<AppContext.Provider value={{
			user,
			isLoggedIn,
			//Home
			searchPlaceValue, setSearchPlaceValue,
			searchDateRange, setSearchDateRange,
			seacrchNumOfRooms, setSeacrchNumOfRooms,
			seacrchNumOfGuest, setSeacrchNumOfGuest,
			seacrchNumOfChild, setSeacrchNumOfChild
		}}>
			{children}
		</AppContext.Provider>
	)
}
