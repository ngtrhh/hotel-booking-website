import { Spin } from 'antd';
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import useFireStore from '../Hooks/useFireStored';
import { format, addDays, differenceInDays } from "date-fns";
import vi from "date-fns/locale/vi";

import { AuthContext } from './AuthProvider';
import { HomeContext } from './HomeContext';
import { connectFirestoreEmulator, limit } from 'firebase/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
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

	//Header
	const [isUserDropdown, setIsUserDropdown] = useState(false);
	const [provinces, setProvinces] = useState([]);
	

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
	useFireStore('accoms', setAccoms, -1);

	//Result Filterbar
	const [priceInput, setPriceInput] = useState([0, 20000000]);

	const [accommodationTypeFilter, setAccommodationTypeFilter] = useState([
		{ name: 'hotel', label: 'Khách sạn', checked: false },
		{ name: 'apartment', label: 'Căn hộ', checked: false },
		{ name: 'homestay', label: 'Homestay', checked: false },
		{ name: 'resort', label: 'Resort', checked: false },
		{ name: 'guesthouse', label: 'Nhà nghỉ', checked: false },
		{ name: 'villa', label: 'Biệt thự', checked: false }
	]);

	const [commonFilter, setCommonFilter] = useState([
		{ name: 'includeBreakfast', label: 'Bao gồm bữa sáng', checked: false },
		{ name: 'freeCancellation', label: 'Hủy phòng miễn phí', checked: false },
		{ name: 'payLater', label: 'Đặt trước, trả tiền sau', checked: false },
		{ name: 'singleBed', label: 'Giường đơn', checked: false }
	]);

	const [starFilterChoices, setStarFilterChoices] = useState([
		{ name: '_2star', label: '2', checked: false },
		{ name: '_3star', label: '3', checked: false },
		{ name: '_4star', label: '4', checked: false },
		{ name: '_5star', label: '5', checked: false }
	]);

	const [ratingFilterChoices, setRatingFilterChoices] = useState([
		{ name: 'rating3', label: '3', checked: false },
		{ name: 'rating3_5', label: '3.5', checked: false },
		{ name: 'rating4', label: '4', checked: false },
		{ name: 'rating4_5', label: '4.5', checked: false },
		{ name: 'rating5', label: '5', checked: false }
	]);

	const [facilityFilter, setFacilityFilter] = useState([
		{ name: 'wifi', label: 'Wifi', checked: false },
		{ name: 'freeBreakfast', label: 'Bữa sáng miễn phí', checked: false },
		{ name: 'pool', label: 'Hồ bơi', checked: false },
		{ name: 'parking', label: 'Chỗ đậu xe', checked: false },
		{ name: 'restaurant', label: 'Nhà hàng', checked: false },
		{ name: '24hReception', label: 'Lễ tân 24h', checked: false },
		{ name: 'elevator', label: 'Thang máy', checked: false },
		{ name: 'airportShuttle', label: 'Đưa đón sân bay', checked: false },
		{ name: 'gym', label: 'Trung tâm thể dục', checked: false },
		{ name: 'dailyCleaning', label: 'Dọn phòng hằng ngày', checked: false },
		{ name: 'meetingRoom', label: 'Phòng họp', checked: false },
		{ name: 'petFriendly', label: 'Cho phép thú cưng', checked: false },
		{ name: 'wheelchairAccessible', label: 'Lối đi cho xe lăn', checked: false },
		{ name: 'bar', label: 'Quầy bar', checked: false },
		{ name: 'gymFacilities', label: 'Phòng tập gym', checked: false },
		{ name: 'bbqFacilities', label: 'Tiệc BBQ', checked: false },
		{ name: 'babysittingServices', label: 'Dịch vụ trông trẻ', checked: false },
		{ name: 'familyFriendly', label: 'Thích hợp cho gia đình/trẻ em', checked: false },
		{ name: 'golfCourse', label: 'Sân golf', checked: false },
		{ name: 'smokingArea', label: 'Khu vực hút thuốc', checked: false },
		{ name: 'massageSpa', label: 'Massage & Spa', checked: false }
	]);

	const [paymentFilter, setPaymentFilter] = useState([
		{ name: 'freeCancellation', label: 'Hủy phòng miễn phí', checked: false },
		{ name: 'payLater', label: 'Đặt trước, trả tiền sau', checked: false },
		{ name: 'payAtProperty', label: 'Thanh toán tại nơi ở', checked: false },
		{ name: 'payNow', label: 'Trả tiền ngay', checked: false },
		{ name: 'creditCardNotRequired', label: 'Đặt không cần thẻ tín dụng', checked: false },
		{ name: 'noDepositRequired', label: 'Đặt phòng không cần đặt cọc', checked: false },
		{ name: 'ewalletPayment', label: 'Thanh toán bằng ví điện tử', checked: false },
	]);

	const [bedTypeFilter, setBedTypeFilter] = useState([
		{ name: 'singleBed', label: 'Giường đơn', checked: false },
		{ name: 'twinBeds', label: 'Hai giường đơn', checked: false },
		{ name: 'doubleBed', label: 'Giường đôi', checked: false },
		{ name: 'kingBed', label: 'Giường đôi lớn', checked: false }
	]);

	const [sortOpitons, setSortOpitons] = useState([
		{ name: 'mostPopular', label: 'Phổ biến nhất', selected: false },
		{ name: 'highestRating', label: 'Đánh giá cao nhất', selected: false },
		{ name: 'highestPrice', label: 'Giá cao nhất', selected: false },
		{ name: 'lowestPrice', label: 'Giá thấp nhất', selected: false }
	]);

	//Details
	const [selectedAccomId, setSelectedAccomId] = useState('');
	const [selectedRoomType, setSelectedRoomType] = useState('');
	const [accomData, setAccomData] = useState({});
	const [roomTypes, setRoomTypes] = useState([]);
	const [rooms, setRooms] = useState([]);
	
	useFireStore('roomtypes', setRoomTypes);
	useFireStore('rooms', setRooms, -1);

	

	//Booking
	const [bookingName, setBookingName] = useState('');
	const [bookingEmail, setBookingEmail] = useState('');
	const [bookingPhone, setBookingPhone] = useState('');
	const [bookingTax, setBookingTax] = useState(99000);
	const [bookingDiscount, setBookingDiscount] = useState(99000);
	const [totalBookingPrice, setTotalBookingPrice] = useState(0);
	const [roomsToBook, setRoomsToBook] = useState({});

	const [cardNumber, setCardNumber] = useState('');
	const [cardValidDate, setCardValidDate] = useState('');
	const [cardSecret, setCardSecret] = useState('');
	const [cardOwnerName, setCardOwnerName] = useState('');
	const [orderId, setOrderId] = useState('');
	const [bookingSuccess, setBookingSuccess] = useState(false);

	//Booking History
	const[orders, setOrders] = useState([]);
	const ordersQueryCondition = {
		fieldName: 'uid', 
		operator: '==', 
		comparedValue: user?.uid || ''
	}
	const [bookingHistoryData, setBookingHistoryData] = useState(null);
	
	// useFireStore('orders', setOrders, -1, ordersQueryCondition);
	React.useEffect(() => {
		if(user?.uid || false){
			const collectionRef = collection(db, 'orders');
		
			const q = query(collectionRef, where('uid', '==', user.uid));
	
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const documents = [];
				querySnapshot.forEach((doc) => {
					documents.push({
						...doc.data(),
						'orderId': doc.id
					});
				});
				setOrders(documents);
			});
			return unsubscribe;
		}
	}, [bookingSuccess, user]);

	// useEffect(() => {
	// 	console.log(orders);
	// }, [orders]);
	
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
	
	return (
		<AppContext.Provider value={{
			user,
			isLoggedIn,
			//Home
			searchPlaceValue, setSearchPlaceValue,
			searchDateRange, setSearchDateRange,
			seacrchNumOfRooms, setSeacrchNumOfRooms,
			seacrchNumOfGuest, setSeacrchNumOfGuest,
			seacrchNumOfChild, setSeacrchNumOfChild,
			provinces, setProvinces,
			//Accoms
			accoms,
			//Result Filterbar
			accommodationTypeFilter, setAccommodationTypeFilter,
			priceInput, setPriceInput,
			commonFilter, setCommonFilter,
			starFilterChoices, setStarFilterChoices,
			ratingFilterChoices, setRatingFilterChoices,
			facilityFilter, setFacilityFilter,
			paymentFilter, setPaymentFilter,
			bedTypeFilter, setBedTypeFilter,
			sortOpitons, setSortOpitons,
			//Detail
			selectedAccomId, setSelectedAccomId,
			selectedRoomType, setSelectedRoomType,
			accomData, setAccomData,
			roomTypes, setRoomTypes,
			rooms, setRooms,
			//Booking
			bookingName, setBookingName,
			bookingEmail, setBookingEmail,
			bookingPhone, setBookingPhone,
			bookingTax, setBookingTax,
			bookingDiscount, setBookingDiscount,
			totalBookingPrice, setTotalBookingPrice,
			roomsToBook, setRoomsToBook,
			cardNumber, setCardNumber,
			cardValidDate, setCardValidDate,
			cardSecret, setCardSecret,
			cardOwnerName, setCardOwnerName,
			orderId, setOrderId,
			bookingSuccess, setBookingSuccess,
			isUserDropdown, setIsUserDropdown,
			
			//BookingHistory
			orders, setOrders,
			bookingHistoryData, setBookingHistoryData
		}}>
			{children}
		</AppContext.Provider>
	)
}
