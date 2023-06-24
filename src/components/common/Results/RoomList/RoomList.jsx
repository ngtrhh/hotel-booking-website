import React, {useState, useEffect, useRef} from "react";
import Button from "../../Button"
import { BsMap } from "react-icons/bs";
import RoomListSortItem from "./RoomListSortItem";
import StarItem from "../FilterBar/StarItem";
import CardRoomItem from "./CardRoomItem";
import Pagination from "./Pagination ";

export const RoomList = (roomsData) => {
    const sortRef = useRef(null)
    const ScrollAfterPageChanged = () => sortRef.current.scrollIntoView()

    const [sortOpitons, setSortOpitons] = useState([
		{ name: 'mostPopular', label: 'Phổ biến nhất', selected: true },
		{ name: 'highest Rating', label: 'Đánh giá cao nhất', selected: false },
		{ name: 'highestPrice', label: 'Giá cao nhất', selected: false },
		{ name: 'lowestPrice', label: 'Giá thấp nhất', selected: false }
	]);

    //Nhớ thêm roomId
    const [roomListRawData, setRoomListRawData] = useState([
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://s3-alpha-sig.figma.com/img/6568/0aa1/2110b9ee0298ee15be0b83db0994f6ee?Expires=1688342400&Signature=j21MJ0db1bKtgcBYtPEGQ4ubYFToXUuLXCXkxCpOcviZC3gh~s6B1XRJge0D5rB5O46otDjHa3kmFS8QDo29XQNGHMY~TVK9bSakNKqIVdJTY8TANV6xdf3aXQZv3Ogt0d-7EMSohfTa3W5-jUUxtdDCE744wZZTmrfLhHVeZHCRZXh96~lVOegvHLLukSKKIe3-SZqaJ2a~5SpjhpP7BlEaDa1COx6zK2rhlePz3hag-0qL4xYDBFUEqPp1a0raKaxXSTK~U058CBy20V2Me1a35sHROQwJTE0MnUfsJq0NF4qpUuCvoTRSbrivRsb~xlnWP99DP0t3P7zMBQjo~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        {
            accommodationType: 'Resort',
            numOfStars: '4',
            loved: false,
            roomImg: 'https://thecancunsun.com/wp-content/uploads/2021/12/Top-5-Star-all-inclusive-Resorts-in-Cancun-for-2022-SQUARE.jpg',
            accomName: 'Khách sạn NewWorld',
            accomAddress: 'Võ Thị Sáu, Vũng Tàu',
            facility: [
                'Bungalow nhìn ra vườn',
                'Miễn phí hủy phòng',
                'Bao bữa sáng',
                'Wifi',
                'Hồ bơi ngoài trời',
                'Vòi nước nóng',
                'Gần biển',
                'Có TV'
            ],
            originalPrice: '1.100.000',
            salePrice: '990.000',
            perUnit: '/đêm'
        },
        
    ]);

    const roomsPerPage = 20;

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = roomListRawData.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => {
        if(pageNumber != '...'){
            setCurrentPage(pageNumber);
            ScrollAfterPageChanged();
        }
    };

    const HandleSortChange = (optionSelected) => {
        const updatedSortOption = sortOpitons.map(option => {
            if(option.name === optionSelected){
                console.log("wd");  
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

    return(
        <div className="results-roomlist">
            <div className="results-roomlist__map">
                <Button iconSize={24} preIcon={BsMap} className="cyan results-roomlist__map__button">Xem vị trí trên bản đồ</Button>
            </div>
            <div className="results-roomlist__header">
                <p>
                    <span>1000+ </span>
                    chỗ nghỉ phù hợp tại 
                    <span> Phú Quốc</span>
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
                        totalRooms={roomListRawData.length}
                        paginate={paginate}
                    />
                </div>
                
            </div>
            
        </div>
    );
    
}

export default RoomList;
