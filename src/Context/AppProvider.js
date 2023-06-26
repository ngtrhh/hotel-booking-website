import { Spin } from 'antd';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import useFireStore from '../Hooks/useFireStored';

import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider ({children}) {
	const user = useContext(AuthContext).user;
 
	const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
	const [isInviteVisible, setIsInviteVisible] = useState(false);
	const [selectedRoomId, setSelectedRoomId] = useState('');
	const [firstLoaded, setFirstLoaded] = useState(true);
	
	
	const roomCondition = React.useMemo(() => {
		return {
			fieldName: 'members',
			operator: 'array-contains',
			comparedValue: user.uid ? user.uid : ''
		}
	}, [user.uid]);
	const rooms= useFireStore('rooms', roomCondition);
	
	
	const selectedRoom = React.useMemo(
		() => rooms.find((room) => room.id === selectedRoomId), 
		[rooms, selectedRoomId]
	);
	
	React.useEffect(() => {
		if(rooms.length && firstLoaded){
			setSelectedRoomId(rooms[0].id);
			setFirstLoaded(false);
		}
	}, [rooms]);
	const selectedRoomDepen= selectedRoom ? selectedRoom.members : [];

	const userCondition = React.useMemo(() => {
		return {
			fieldName: 'uid',
			operator: 'in',
			comparedValue: selectedRoom ? selectedRoom.members : [''] 
		}
	}, [selectedRoom]);
	const members = useFireStore('users', userCondition);
	
	return (
		<AppContext.Provider value={{rooms, isAddRoomVisible, setIsAddRoomVisible,
			selectedRoomId, setSelectedRoomId,
			selectedRoom, setFirstLoaded,
			members,
			isInviteVisible, setIsInviteVisible
		}}>
			{children}
		</AppContext.Provider>
	)
}
