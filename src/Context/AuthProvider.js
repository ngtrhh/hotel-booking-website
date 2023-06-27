import { Spin } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

export const AuthContext = React.createContext();

export default function AuthProvider ({children}) {
	const [user, setUser] = useState({})
	let navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	React.useEffect(() => {
		const unsubscribed = auth.onAuthStateChanged((user) => {
			if(user){
				const {displayName, email, uid, photoURL} = user;
				setUser({
					displayName, email, uid, photoURL
				});
				setIsLoading(false);
				//navigate('/');
			}
			else{
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
