import React, {useState, useEffect, useRef} from "react";
import Button from "../../Button"
import { BsMap } from "react-icons/bs";
import RoomListSortItem from "./RoomListSortItem";
import StarItem from "../FilterBar/StarItem";
import CardRoomItem from "./CardRoomItem";
import Pagination from "./Pagination ";
import { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";
import { addDocument } from "../../../../firebase/services";

export const RoomList = (roomsData) => {
    const dataProvided = useContext(AppContext);
    const sortRef = useRef(null)
    const ScrollAfterPageChanged = () => sortRef.current.scrollIntoView()
    const {searchPlaceValue, setSearchPlaceValue,
        searchDateRange, setSearchDateRange,
        seacrchNumOfRooms, setSeacrchNumOfRooms,
        seacrchNumOfGuest, setSeacrchNumOfGuest,
        seacrchNumOfChild, setSeacrchNumOfChild,
        priceInput, commonFilter, starFilterChoices,
        ratingFilterChoices, accommodationTypeFilter, facilityFilter,
        paymentFilter, bedTypeFilter
    } = dataProvided

    const [sortOpitons, setSortOpitons] = useState([
		{ name: 'mostPopular', label: 'Phổ biến nhất', selected: false },
		{ name: 'highestRating', label: 'Đánh giá cao nhất', selected: false },
		{ name: 'highestPrice', label: 'Giá cao nhất', selected: false },
		{ name: 'lowestPrice', label: 'Giá thấp nhất', selected: false }
	]);

    //Nhớ thêm roomId
    const [roomListRawData, setRoomListRawData] = [dataProvided.accoms, dataProvided.setAccoms];

    const [roomListFilteredData, setRoomListFilteredData] = useState(roomListRawData);
    
    useEffect(() => {
        FilterAndSortRoomData(roomListRawData);
    }, [roomListRawData, priceInput, commonFilter, starFilterChoices,
        ratingFilterChoices, accommodationTypeFilter, facilityFilter,
        paymentFilter, bedTypeFilter, sortOpitons]);

    useEffect(() => {
        // console.log(roomListFilteredData);
    }, [roomListFilteredData]);

    const FilterAndSortRoomData = (roomListRawData) => {
        let filterRooms = [];
        let tempRooms = [];
        //PriceFilter
        let priceFilter = 0;
        roomListRawData.forEach((data) => {
            priceFilter = parseInt((data.price).replace(/\./g, ""));
            if(priceFilter < priceInput[1]){
                tempRooms.push(data);
            }
        })
        filterRooms.push(...tempRooms);

        //CommonFilter
        
        let found = false;
        tempRooms = [];
        filterRooms.forEach((roomsData) => {
            found = true;
            commonFilter.forEach((cmData) => {
                if(cmData.checked && !(roomsData.facilities).includes(cmData.label)){
                    found = false;
                }
            });
            if(found){
                tempRooms.push(roomsData);
            }
        });
        filterRooms = tempRooms;

        //StarFilter
        let starFilterChecked = false;
        starFilterChoices.forEach((data) => {
            if(data.checked){
                starFilterChecked = true;
            }
        });
        if(starFilterChecked){
            tempRooms = [];
            found = true;
            filterRooms.forEach((roomsData) => {
                found = true;
                starFilterChoices.forEach((starFilter) => {
                    if(starFilter.checked && roomsData.star == starFilter.label){
                        tempRooms.push(roomsData);
                    }
                });
            });
            filterRooms = tempRooms;
        }
        
        //RatingFilter
        let ratingFilter = 3*2;
        tempRooms = [];
        ratingFilterChoices.forEach((data) => {
            if(data.checked){
                ratingFilter = Number(data.label) * 2;
            }
        });
        filterRooms.forEach((roomsData) => {
            if(roomsData.rating >= ratingFilter){
                tempRooms.push(roomsData);
            }
        });
        filterRooms = tempRooms;

        //Sort Most Popular
        sortOpitons.forEach((data) => {
            if(data.selected){
                if(data.name == 'mostPopular'){
                    filterRooms.sort(CompareByRatingCount);
                }
                else if(data.name == 'highestRating'){
                    filterRooms.sort(CompareByRating);
                }
                else if(data.name == 'highestPrice'){
                    filterRooms.sort(CompareByPriceHighest);
                }
                else{
                    filterRooms.sort(CompareByPriceLowest);
                }
            }
        });


        setRoomListFilteredData(filterRooms);
    };

    const CompareByRatingCount = (a, b) => {
        const ratingCountA = parseInt(a.ratingCount.replace(/\./g, ''));
        const ratingCountB = parseInt(b.ratingCount.replace(/\./g, ''));
        return ratingCountB - ratingCountA;
    };
    const CompareByRating = (a, b) => {
        const ratingA = parseInt(a.rating.replace(/\./g, ''));
        const ratingB = parseInt(b.rating.replace(/\./g, ''));
        return ratingB - ratingA;
    };
    const CompareByPriceHighest = (a, b) => {
        const priceA = parseInt(a.price.replace(/\./g, ''));
        const priceB = parseInt(b.price.replace(/\./g, ''));
        return priceB - priceA;
    };
    const CompareByPriceLowest = (a, b) => {
        const priceA = parseInt(a.price.replace(/\./g, ''));
        const priceB = parseInt(b.price.replace(/\./g, ''));
        return priceA - priceB;
    };

    const roomsPerPage = 20;

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = roomListFilteredData.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => {
        if(pageNumber != '...'){
            setCurrentPage(pageNumber);
            ScrollAfterPageChanged();
        }
    };

    const HandleSortChange = (optionSelected) => {
        const updatedSortOption = sortOpitons.map(option => {
            if(option.name === optionSelected){
                return{
                    ...option,
                    selected: !option.selected
                }
                
            }
            return{
                ...option,
                selected: false
            }
        });
        setSortOpitons(updatedSortOption)
    }
    const AddAccoms = () => {
        const data = [
            {
                address: 'Đường Trường Sa Quận Ngũ Hành Sơn, Đà Nẵng 550000 Việt Nam',
                facilities: ['Chỗ đậu xe', 'Bữa sáng miễn phí', 'Quầy bar', 'Wifi', 'Bao gồm bữa sáng', 'Hủy phòng miễn phí', 'Tiệc BBQ', 'Hồ bơi', 'Trung tâm thể dục', 'Phòng tập gym'],
                images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/08/f5/a5/3-bedroom-garden-view.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/18/43/66/pool--v10351644.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/97/56/00/three-bedroom-beach-front.jpg?w=1100&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/9d/a8/6c/naman-retreat.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/97/49/03/wedding.jpg?w=1100&h=-1&s=1'
                ],
                name: 'Naman Retreat',
                originalPrice: '10.000.000',
                price: '9.000.000',
                rating: '10.0',
                ratingCount: '3.689',
                star: '5',
                payment: ['Hủy phòng miễn phí', 'Thanh toán bằng ví điện tử', 'Đặt trước, trả tiền sau'],
                bedTypes: ['Giường đơn', 'Hai giường đơn', 'Giường đôi'],
                summary: `Ai cũng xứng đáng tận hưởng những giây phút nghỉ ngơi. Naman Retreat sẽ là một lựa chọn tuyệt vời cho những du khách đến Đà Nẵng tìm kiếm sự nghỉ ngơi và thư giãn. Nổi tiếng với không khí sang trọng, và vị trí gần nhà hàng, Naman Retreat sẽ giúp bạn tận hưởng những gì tuyệt nhất ở Đà Nẵng.

                Các phòng khách sạn cung cấp tv màn hình phẳng, điều hòa nhiệt độ và tủ lạnh, và online là có thể vì wifi miễn phí có sẵn, cho phép bạn thư giãn nghỉ ngơi không phải lo lắng gì.
                
                Naman Retreat cung cấp dịch vụ phòng và nhân viên hỗ trợ khách. Hơn nữa, là khách hàng giá trị của Naman Retreat, bạn có thể tận hưởng bể bơi và bữa sáng, có sẵn tại khách sạn. Khách đi đến khách sạn bằng phương tiện của mình có thể dùng đỗ xe miễn phí.
                
                Khi ở Đà Nẵng hãy nhớ thử đồ nướng lân cận như Holy Pig hoặc The Grill.
                
                Không thiếu hoạt động trong vùng: hãy khám phá phòng trưng bày nghệ thuật nổi tiếng như Tu Hung Stone Arts, The Workshop và OASIS ART GALLERY.
                
                Dù bạn đi công tác, đi nghỉ dưỡng hay cả hai, Naman Retreat chắc chắn sẽ làm chuyến đi của bạn tới Đà Nẵng không bao giờ quên`,
                type: 'Khách sạn'
            },
            {
                address: '5 Trường Sa Hòa Hải, Ngũ Hành Sơn, Đà Nẵng 550000 Việt Nam',
                facilities: ['Bữa sáng miễn phí', 'Chỗ đậu xe', 'Quầy bar', 'Wifi', 'Tiệc BBQ', 'Massage & Spa', 'Hồ bơi', 'Trung tâm thể dục', 'Phòng tập gym'],
                images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/5b/72/b0/guest-room.jpg?w=1100&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/2a/a0/36/beach.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/5d/96/1f/villa-area.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/2d/a1/b5/hyatt-regency-danang.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/2d/a1/59/hyatt-regency-danang.jpg?w=1200&h=-1&s=1'
                ],
                name: 'Hyatt Regency Danang Resort & Spa',
                originalPrice: '7.400.000',
                price: '4.300.000',
                rating: '9.0',
                ratingCount: '3.187',
                star: '4',
                payment: ['Hủy phòng miễn phí', 'Thanh toán bằng ví điện tử', 'Đặt trước, trả tiền sau'],
                bedTypes: ['Giường đơn', 'Hai giường đơn', 'Giường đôi'],
                summary: `Tọa lạc trên bãi biển Non Nước tuyệt đẹp, nằm ngay cửa ngõ vào thành phố Đà Nẵng sôi động, khu nghỉ mát Hyatt Regency Đà Nẵng Resort & Spa là điểm dừng chân lý tưởng dành cho mọi người, để khám phá sức hút khó cưỡng của miền trung Việt Nam, và phù hợp cho mọi dịp, từ hội họp, sự kiện đến những kỳ nghỉ đáng nhớ của gia đình. Khu nghỉ dưỡng cách danh lam thắng cảnh Ngũ Hành Sơn chỉ vài phút, 
                và gần các di sản thế giới được UNESCO công nhận như Cố đô Huế, phố cổ Hội An và di tích Mỹ Sơn.`,
                type: 'Resort'
            },
            {
                address: '38 Nguyễn Đình Chiểu, Hàm Tiến, Mũi Né, Phan Thiết Việt Nam',
                facilities: ['Tiệc BBQ', 'Hồ bơi', 'Trung tâm thể dục', 'Phòng tập gym', 'Bữa sáng miễn phí', 'Bao gồm bữa sáng', 'Hủy phòng miễn phí', 'Chỗ đậu xe', 'Quầy bar', 'Wifi'],
                images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/2c/32/66/beachfront-bungalow-outside.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/1a/34/c4/bamboo-village-beach.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/2c/35/00/ocean-view-from-beachfront.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/d0/cf/68/bamboo-village-beach.jpg?w=700&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/d0/ce/9f/bungalow-beach-front.jpg?w=1200&h=-1&s=1'
                ],
                name: 'Khu nghỉ dưỡng Làng Tre',
                originalPrice: '5.400.000',
                price: '3.300.000',
                rating: '10.0',
                ratingCount: '3.613',
                payment: ['Thanh toán bằng ví điện tử', 'Đặt trước, trả tiền sau', 'Thanh toán tại nơi ở', 'Trả tiền ngay'],
                bedTypes: ['Giường đơn', 'Hai giường đơn', 'Giường đôi', 'Giường đôi lớn'],
                star: '4',
                summary: `Hãy tự hỏi tại sao nhiều khách du lịch đã lựa chọn Khu nghỉ dưỡng Làng Tre khi đến Phan Thiết. Khách sạn là sự tổng hợp của những giá trị lý tưởng, sự thoải mái và thuận tiện như khung cảnh lãng mạn cùng với loạt tiện nghi được thiết kế cho những khách du lịch như bạn.

                Nếu bạn thích khám phá Forgotten Land Sand Sculpture Park (3,1 km) khi đến Phan Thiết, Bamboo Village Beach Hotel nằm không xa.
                
                Các phòng khách sạn cung cấp tv màn hình phẳng, điều hòa nhiệt độ và tủ lạnh, và Bamboo Village Beach Hotel làm cho việc kết nối internet trở nên dễ dàng vì wifi miễn phí có sẵn.
                
                Bạn cũng có thể tận hưởng một số tiện nghi được cung cấp bởi khách sạn, bao gồm nhân viên hỗ trợ khách và dịch vụ phòng. Hơn nữa, khách có thể tận hưởng bể bơi và bữa sáng trong suốt thời gian ở đây. Một điểm thuận tiện nữa đó là đỗ xe miễn phí có sẵn cho khách.
                
                Khi đến Phan Thiết, bạn có thể muốn thử thịt chiên schnitzel tại một trong những nhà hàng lân cận như Nhà Hàng Ratinger Löwe hoặc The Bar.
                
                Phan Thiết cũng là nơi sinh ra Đình Vạn Thủy Tú, một đài kỷ niệm nổi tiếng nằm không xa Bamboo Village Beach Hotel.
                
                Tại Khu nghỉ dưỡng Làng Tre, sự thoải mái và hài lòng của bạn được đặt lên hàng đầu, và họ mong muốn được chào đón bạn tới Phan Thiết.`,
                type: 'Resort'
            },
            {
                address: 'Tổ 1, Khu du lịch Đức Việt Khu Bãi Trường, Dương Tơ, Đảo Phú Quốc 920000 Việt Nam',
                facilities: ['Bữa sáng miễn phí', 'Chỗ đậu xe', 'Tiệc BBQ', 'Hồ bơi', 'Trung tâm thể dục', 'Phòng tập gym', 'Quầy bar', 'Wifi'],
                images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/0c/8d/55/sol-beach-house-phu-quoc.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/c1/6e/d4/the-shack.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/0c/8b/03/sol-beach-house-phu-quoc.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/8e/36/b9/lobby-bar.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/0c/8b/a7/sol-beach-house-phu-quoc.jpg?w=1200&h=-1&s=1'
                ],
                name: 'Sol Phu Quoc',
                originalPrice: '1.900.000',
                price: '1.800.000',
                rating: '9.0',
                ratingCount: '1.605',
                star: '4',
                payment: ['Thanh toán bằng ví điện tử', 'Đặt trước, trả tiền sau', 'Thanh toán tại nơi ở', 'Trả tiền ngay'],
                bedTypes: ['Giường đơn', 'Hai giường đơn', 'Giường đôi', 'Giường đôi lớn'],
                summary: `Đỗ xe và Wi-Fi luôn miễn phí, vì vậy quý khách có thể giữ liên lạc, đến và đi tùy ý. Nằm ở vị trí trung tâm tại Dương Tơ của Phu Quoc Island, chỗ nghỉ này đặt quý khách ở gần các điểm thu hút và tùy chọn ăn uống thú vị. Đừng rời đi trước khi ghé thăm Bãi Sao nổi tiếng. Được xếp hạng 4.5 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa, bể bơi ngoài trời và xông khô ngay trong khuôn viên.`,
                type: 'Resort'
            },
            {
                address: 'Lô D6B2 - D7A1, Nguyễn Tất Thành, Khu 2, Cam Hải Đông 650000 Việt Nam',
                facilities: ['Trung tâm thể dục', 'Tiệc BBQ', 'Hồ bơi', 'Thích hợp cho gia đình/trẻ em', 'Phòng tập gym', 'Bữa sáng miễn phí', 'Chỗ đậu xe', 'Quầy bar', 'Wifi'],
                images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/42/99/06/exterior.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/dd/7f/20/vinpearl-nha-trang-long.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/ed/74/10/yhi-spa.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/ed/73/7a/elyxr-bar.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/ed/72/92/elyxr-bar.jpg?w=1200&h=-1&s=1'
                ],
                name: 'Melia Vinpearl Cam Ranh Beach Resort',
                originalPrice: '7.800.000',
                price: '7.000.000',
                rating: '10.0',
                ratingCount: '1.221',
                payment: ['Hủy phòng miễn phí', 'Thanh toán bằng ví điện tử', 'Đặt trước, trả tiền sau'],
                bedTypes: ['Giường đơn', 'Hai giường đơn', 'Giường đôi'],
                star: '5',
                summary: `Melia Vinpearl Cam Ranh Beach Resort là một khu nghỉ dưỡng 5 sao nằm tại bãi biển Cam Ranh, tỉnh Khánh Hòa, Việt Nam. Được quản lý bởi chuỗi khách sạn Melia Hotels International và hợp tác với tập đoàn Vinpearl, khu nghỉ dưỡng này mang đến cho khách hàng trải nghiệm nghỉ dưỡng sang trọng và tiện nghi.

                Với vị trí đắc địa bên bờ biển xanh mát, Melia Vinpearl Cam Ranh Beach Resort cung cấp cho khách hàng một không gian nghỉ dưỡng tuyệt vời và tận hưởng những cảnh quan tuyệt đẹp của biển và thiên nhiên xung quanh.
                
                Khu nghỉ dưỡng bao gồm các loại hình chỗ ở đa dạng như phòng khách sạn, biệt thự và căn hộ với thiết kế hiện đại và sang trọng. Khách hàng có thể tận hưởng không gian riêng tư và tiện nghi cao cấp trong các phòng nghỉ được trang bị đầy đủ các tiện ích và dịch vụ chất lượng.`,
                type: 'Resort'
            },
            {
                address: 'Bãi Dài, Ganh Dau, Đảo Phú Quốc 922200 Việt Nam',
                facilities: ['Bữa sáng miễn phí', 'Chỗ đậu xe', 'Đặt trước, trả tiền sau', 'Tiệc BBQ', 'Hồ bơi', 'Trung tâm thể dục', 'Phòng tập gym', 'Quầy bar', 'Wifi'],
                images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/af/32/a3/vinpearl-discovery-coastalland.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/af/36/3a/vinpearl-discovery-coastalland.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/7c/5f/07/sea-view-villa.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/7c/5c/b4/villa-private-pool.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/af/35/b0/vinpearl-discovery-coastalland.jpg?w=1200&h=-1&s=1'
                ],
                name: 'Melia Vinpearl Phu Quoc',
                originalPrice: '3.800.000',
                price: '3.500.000',
                rating: '10.0',
                ratingCount: '3.222',
                star: '5',
                payment: ['Hủy phòng miễn phí', 'Thanh toán bằng ví điện tử', 'Đặt trước, trả tiền sau'],
                bedTypes: ['Giường đơn', 'Hai giường đơn', 'Giường đôi'],
                summary: `Hãy tự hỏi tại sao khách du lịch đã lựa chọn Meliá Vinpearl Phu Quoc khi đến thăm Đảo Phú Quốc. Khách sạn là sự tổng hợp của những giá trị lý tưởng, sự thoải mái và thuận tiện như khung cảnh sang trọng cùng với những tiện nghi được thiết kế cho những du khách như bạn.

                Là “ngôi nhà xa xứ,” các phòng khu nghỉ dưỡng cung cấp tv màn hình phẳng, bếp nhỏ và quầy bar mini, và kết nối mạng thật dễ dàng, với wifi miễn phí sẵn có.
                
                Khách có thể dùng nhân viên hỗ trợ khách và dịch vụ phòng khi nghỉ tại Meliá Vinpearl Phu Quoc. Ngoài ra, Meliá Vinpearl Phu Quoc còn có bể bơi và bữa sáng, sẽ làm cho kì nghỉ của bạn ở Đảo Phú Quốc trở nên tuyệt vời hơn nữa. Thuận tiện hơn nữa, còn có đỗ xe miễn phí có sẵn cho khách.
                
                Khách du lịch tìm kiếm nhà hàng kiểu á có thể tới Bamboo Cottages & Restaurant hoặc Nhà hàng Ocean Reflection.
                
                Chúng tôi tin rằng bạn sẽ hài lòng với Meliá Vinpearl Phu Quoc khi trải nghiệm tất cả những gì mà Đảo Phú Quốc có thể đưa lại.`,
                type: 'Homestay'
            },
            {
                address: '35 Trường Sa Hoa Hai Ward, Ngu Hanh Son District, Đà Nẵng 550000 Việt Nam',
                facilities: ['Quầy bar', 'Wifi', 'Tiệc BBQ', 'Hồ bơi', 'Trung tâm thể dục', 'Phòng tập gym', 'Bữa sáng miễn phí', 'Chỗ đậu xe'],
                images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/5e/81/85/exterior.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cd/97/55/sheraton-grand-danang.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cd/97/4f/sheraton-grand-danang.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/37/4f/57/danang-room-lounge-setup.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/37/4f/56/saigon-room-bilateral.jpg?w=1200&h=-1&s=1'
                ],
                name: 'Sheraton Grand Danang Resort & Convention Center',
                originalPrice: '5.200.000',
                price: '4.200.000',
                rating: '9.0',
                ratingCount: '3.613',
                star: '5',
                summary: `Sheraton Grand Danang Resort là khách sạn 5 sao cao cấp tọa lạc trên bờ cát xinh đẹp của bãi biển Non Nước, và là một địa điểm với thiết kế độc đáo, phù hợp cho những chuyến đi nghỉ dưỡng cùng gia đình và bạn bè, cũng như các chuyến công tác hay nghỉ dưỡng cá nhân. Thức giấc và tận hưởng hương biển và ánh nắng rực rỡ khi quý khách nghỉ tại một trong 258 phòng nghỉ thanh lịch của chúng tôi.`,
                type: 'Khách sạn',
                payment: ['Hủy phòng miễn phí', 'Thanh toán bằng ví điện tử', 'Đặt trước, trả tiền sau'],
                bedTypes: ['Giường đơn', 'Hai giường đơn', 'Giường đôi'],
            },
            {
                address: 'Khem Beach, An Thoi, Đảo Phú Quốc 92513 Việt Nam',
                facilities: ['Hồ bơi', 'Trung tâm thể dục', 'Đặt trước, trả tiền sau', 'Phòng tập gym', 'Tiệc BBQ', 'Bữa sáng miễn phí', 'Chỗ đậu xe', 'Quầy bar', 'Wifi'],
                images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/4e/dc/a3/new-world-phu-quoc-resort.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/d4/5e/c8/new-world-phu-quoc-resort.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/d4/5f/2b/new-world-phu-quoc-resort.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/d4/5f/79/new-world-phu-quoc-resort.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/bf/46/84/lua-grill-bar.jpg?w=1200&h=-1&s=1'
                ],
                name: 'New World Phu Quoc Resort',
                originalPrice: '5.400.000',
                price: '5.200.000',
                rating: '10.0',
                ratingCount: '617',
                star: '5',
                payment: ['Thanh toán bằng ví điện tử', 'Đặt trước, trả tiền sau', 'Thanh toán tại nơi ở', 'Trả tiền ngay'],
                bedTypes: ['Giường đơn', 'Hai giường đơn', 'Giường đôi', 'Giường đôi lớn'],
                summary: `Khu nghỉ dưỡng New World Phú Quốc là khu nghỉ dưỡng đầu tiên của thương hiệu New World tại Việt Nam, nằm ở phía nam Đảo Ngọc, mang vẻ đẹp của làng chài ven biển. Đây cũng là nơi được mệnh danh là kho báu thiên nhiên miền nhiệt đới, nơi đánh thức các giác quan của mọi du khách với biển xanh, cát trắng, hoà cùng nét mộc mạc và giản dị trong từng không gian nghỉ dưỡng.

                Cho dù bạn đang tìm kiếm một chốn dừng chân bình yên giữa thiên nhiên, hay nơi ẩn mình thư thái bên cảnh biển tuyệt đẹp mà không mất đi sự gắn kết thân thuộc với gia đình và bạn bè, thì những căn biệt thự đa dạng tại New World Phú Quốc chắc hẳn sẽ không làm bạn thất vọng. Đằng sau mỗi cánh cửa là một thế giới thư giãn đầy cảm hứng mở ra những xúc cảm diệu kỳ.`,
                type: 'Resort'
            },
            {
                address: 'Lac Long Quan Street Cua Dai Beach, Hội An Việt Nam',
                facilities: ['Bữa sáng miễn phí', 'Chỗ đậu xe', 'Tiệc BBQ', 'Hồ bơi', 'Trung tâm thể dục','Đặt trước, trả tiền sau', 'Phòng tập gym', 'Quầy bar', 'Wifi'],
                images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/82/44/49/palm-garden-beach-resort.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/d1/5e/df/palm-garden-beach-resort.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/d1/5e/e7/palm-garden-beach-resort.jpg?w=1200&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/82/af/5c/the-wessia-restaurant.jpg?w=1100&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/82/af/d7/the-wessia-restaurant.jpg?w=1100&h=-1&s=1'
                ],
                name: 'Khu Nghỉ Dưỡng Palm Garden Resort Hội An',
                originalPrice: '8.300.000',
                price: '5.500.000',
                rating: '9.0',
                ratingCount: '3.542',
                star: '5',
                summary: `Khu nghỉ dưỡng & Spa Bãi biển Vườn Cọ là một lựa chọn tuyệt vời cho khách du lịch khi đến thăm Hội An, mang đến không khí sang trọng cùng với những tiện nghi hữu ích cho suốt thời gian lưu trú của bạn.

                Palm Garden Beach Hotel cung cấp cho khách nhiều tiện nghi bao gồm tv màn hình phẳng, điều hòa nhiệt độ và tủ lạnh, và kết nối mạng là có thể vì wifi miễn phí có sẵn.
                
                Khu nghỉ dưỡng cung cấp dịch vụ phòng và nhân viên hỗ trợ khách, làm cho kỳ nghỉ của bạn dễ chịu hơn nữa. Khách sạn còn cung cấp bể bơi và bữa sáng. Khách đi đến khách sạn bằng phương tiện của mình có thể dùng đỗ xe miễn phí.`,
                type: 'Resort',
                payment: ['Thanh toán bằng ví điện tử', 'Đặt trước, trả tiền sau', 'Thanh toán tại nơi ở', 'Trả tiền ngay'],
                bedTypes: ['Giường đơn', 'Hai giường đơn', 'Giường đôi', 'Giường đôi lớn']
            }
        ];
        const rulesData = [
            {
                accomId: 'accom1',
                checkInTime: 'Từ ' + ((Math.floor(Math.random() * 24) + 1) -1).toString() + ':00h',
                checkOutTime: 'Trước ' + ((Math.floor(Math.random() * 24) + 1) -1).toString() + ':00h',
                checkInRule: 'Khách hàng được yêu cầu xuất trình giấy tờ tùy thân trước khi nhận phòng',
                childRule: 'Trẻ em dưới 12 tuổi được lưu trú miễn phí nếu sử dụng giường có sẵn trong phòng',
                bedRule: 'Nôi cũi và giường phụ có sẵn và có thể yêu cầu trước. Phụ phí có thể áp dụng.',
                petRule: 'Không cho phép vật nuôi',
                acceptedCard: 'Thẻ ngân hàng, thẻ tín dụng, thẻ ghi nợ'
            },
        ]
        const roomsData = [
            {
                name: 'Phòng đôi '
            }
        ]
        // let randomIndex = (Math.floor(Math.random() * 9) + 1) -1;
        // for(let i = 1; i <= 360; i++){
        //     randomIndex = (Math.floor(Math.random() * 9) + 1) -1;
        //     addDocument('accoms', {...data[randomIndex], accomId : 'accom' + randomIndex.toString()})
        // }
    }

    return(
        <div className="results-roomlist">
            <div className="results-roomlist__map">
                <Button iconSize={24} preIcon={BsMap} className="cyan results-roomlist__map__button">Xem vị trí trên bản đồ</Button>
            </div>
            <div className="results-roomlist__header">
                <p>
                    <span>{roomListFilteredData.length + " "}</span>
                     chỗ nghỉ phù hợp tại 
                    <span> {searchPlaceValue}</span>
                </p>
            </div>
            <div className="results-roomlist__content">
                <div ref={sortRef} className="results-roomlist__content__sort">
                    <div className="results-roomlist__content__sort__header">
                        Sắp xếp theo
                    </div>
                    <div className="results-roomlist__content__sort__items">
                    {sortOpitons.map(data => (
                        <RoomListSortItem
                            key={data.name}
                            text={data.label}
                            selected={data.selected}
                            onClick = {() => HandleSortChange(data.name)}
                        />
                    ))}
                    </div>
                </div>
                <div className="results-roomlist__content__rooms">
                    <div className="results-roomlist__content__rooms__roomitems">
                        {currentRooms.map((roomData, index) =>(
                            <CardRoomItem key={index} roomData={roomData}/>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        roomsPerPage={roomsPerPage}
                        totalRooms={roomListFilteredData.length}
                        paginate={paginate}
                    />
                </div>
                
            </div>
            {/* <input type="button" value="Add accoms" onClick={AddAccoms}/> */}
        </div>
    );
    
}

export default RoomList;
