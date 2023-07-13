import React, { useContext, useEffect, useState } from 'react'
import { Button, Result } from 'antd';
import { AppContext } from '../../../Context/AppProvider';
import { Link, useNavigate } from 'react-router-dom';

export default function ResultBooking() {
    const navigate = useNavigate();
    const dataProvided = useContext(AppContext);
    const {orderId, bookingSuccess, setBookingSuccess} = dataProvided;
    const [countDown, setCountDown] = useState(5);
    useEffect(() => {
		console.log(orderId);
	}, [orderId]);
    useEffect(() => {
        // Kiểm tra nếu countDown đã đạt đến 0, không làm gì
        if (countDown === 0) {
            setBookingSuccess(false);
            navigate('/'); 
            return;
        }
    
        // Tạo interval để giảm giá trị countDown sau mỗi giây
        const intervalId = setInterval(() => {
            setCountDown(prevCountDown => prevCountDown - 1);
        }, 1000);
    
        // Xóa interval khi component bị unmount hoặc countDown đạt đến 0
        return () => {
            clearInterval(intervalId);
        };
    }, [countDown]);

    useEffect(() =>{
        if(!bookingSuccess){
            navigate('/');
        }
    }, [bookingSuccess]);

    return (
        <>
            <Result
                status="success"
                title="Đặt phòng thành công!"
                subTitle={"Mã đặt phòng: " + orderId + ", vui lòng kiểm tra email hoặc thông tin đặt phòng!"}
                extra={[
                    <Link to={'/'}>
                        <Button type="primary" key="home">
                            Về trang chủ
                        </Button>
                    </Link>
                ,
                <Link to={'/booking-history'}>
                    <Button key="booking-history">Xem phòng đã đặt</Button>
                </Link>
                ]}
            />
            <div className='countdown-container'>
                Tự động trở về trang chủ sau {countDown}s
            </div>
        </>
    
    );
}
