import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { BsSearch } from "react-icons/bs";
import { HorizontalCard } from "../components/common/BookingHistory/HorizontalCard";
import { AppContext } from "../Context/AppProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import { addYears } from "date-fns";
import { GrPowerReset } from "react-icons/gr";
import Helmet from "../components/common/Helmet";

export const BookingHistory = () => {
  const data = useContext(AppContext);
  const { accoms, orders, user } = data;
  const [dataToShow, setDataToShow] = useState([]);
  const [sortedData, setSortedData] = useState(dataToShow);
  const [sortOption, setSortOption] = useState([
    {
      name: "nearest",
      selected: true,
    },
    {
      name: "oldest",
      selected: false,
    },
    {
      name: "highestPrice",
      selected: false,
    },
    {
      name: "lowestPrice",
      selected: false,
    },
  ]);
  const [roomStateShow, setRoomStateShow] = useState("coming");
  const [searchRecvDate, setSearchRecvDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [error, setError] = useState(null);
  const [searchAccomName, setSearchAccomName] = useState("");

  useEffect(() => {
    let newDataToShow = orders.map((order) => {
      const correspondingAccom = accoms.find(
        (accom) => accom.accomId === order.accomId
      );
      if (correspondingAccom) {
        return {
          ...order,
          ...correspondingAccom,
          accomsName: correspondingAccom.name,
        };
      }
      return order;
    });
    newDataToShow = newDataToShow.map((data) => {
      if (!data.canceled) {
        if (Date.now() < data.recvDate.toDate()) {
          return {
            ...data,
            state: "coming",
          };
        } else {
          return {
            ...data,
            state: "passed",
          };
        }
      } else {
        return {
          ...data,
          state: "canceled",
        };
      }
    });
    setDataToShow(newDataToShow);
  }, [accoms, orders, user]);

  // useEffect(() =>{
  //   console.log(dataToShow);
  // }, [dataToShow]);

  const handleSortOptionClick = (index) => {
    const updatedSortOption = [...sortOption];
    updatedSortOption.forEach((option, i) => {
      option.selected = i === index;
    });
    setSortOption(updatedSortOption);
  };

  const HandleChangeStateView = (newState) => {
    setRoomStateShow(newState);
  };

  // useEffect(() =>{
  //   console.log(searchRecvDate);
  // }, [searchRecvDate]);

  useEffect(() => {
    const option = sortOption.find((opt) => opt.selected == true);
    if (dataToShow.length) {
      let tempData = [...dataToShow];

      //Here
      let tempDataToSearch = [];
      const formattedRecvDate = [
        dayjs().set("date", dayjs(searchRecvDate).get("date")).format("DD"),
        dayjs().set("date", dayjs(searchRecvDate).get("month")).format("MM"),
        dayjs().set("date", dayjs(searchRecvDate).get("year")).format("YYYY"),
      ];
      const formattedEndDate = [
        dayjs().set("date", dayjs(searchEndDate).get("date")).format("DD"),
        dayjs().set("date", dayjs(searchEndDate).get("month")).format("MM"),
        dayjs().set("date", dayjs(searchEndDate).get("year")).format("YYYY"),
      ];

      tempData.map((searchData) => {
        const recvDate = [
          dayjs(searchData.recvDate.toDate()).format("DD"),
          dayjs(searchData.recvDate.toDate()).format("MM"),
          dayjs(searchData.recvDate.toDate()).format("YYYY"),
        ];
        const endDate = [
          dayjs(searchData.endDate.toDate()).format("DD"),
          dayjs(searchData.endDate.toDate()).format("MM"),
          dayjs(searchData.endDate.toDate()).format("YYYY"),
        ];

        const isEqualRecvDate = formattedRecvDate.some((element) =>
          recvDate.includes(element)
        );
        const isEqualEndDate = formattedEndDate.some((element) =>
          endDate.includes(element)
        );

        console.log({ accomsName: searchData.accomsName });
        console.log({ searchAccomName: searchAccomName });
        console.log(areStringsSimilar(searchData.accomsName, searchAccomName));
        if (
          isEqualRecvDate &&
          isEqualEndDate &&
          (searchAccomName.toLowerCase() ===
            searchData.accomsName
              .slice(0, searchAccomName.length)
              .toLowerCase() ||
            searchAccomName === "")
        ) {
          tempDataToSearch.push(searchData);
        }
      });
      tempData = [...tempDataToSearch];

      if (option.name === "nearest") {
        tempData.sort((a, b) => b.orderDate - a.orderDate);
      } else if (option.name === "oldest") {
        tempData.sort((a, b) => a.orderDate - b.orderDate);
      } else if (option.name === "highestPrice") {
        tempData.sort((a, b) => b.orderPrice - a.orderPrice);
      } else if (option.name === "lowestPrice") {
        tempData.sort((a, b) => a.orderPrice - b.orderPrice);
      }

      setSortedData(tempData);
    }
  }, [sortOption, dataToShow, searchRecvDate, searchEndDate, searchAccomName]);

  function areStringsSimilar(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // Tạo ma trận có kích thước (m+1) x (n+1) và khởi tạo giá trị ban đầu
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    // Khởi tạo giá trị cho hàng đầu tiên và cột đầu tiên của ma trận
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    // Tính toán khoảng cách Levenshtein Distance
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + 1
          );
        }
      }
    }

    // So sánh giá trị cuối cùng trong ma trận với ngưỡng xác định
    const similarityThreshold = 3;
    return dp[m][n] <= similarityThreshold;
  }

  return (
    <Helmet title="Lịch sử đặt phòng">
      <div className="booking-history">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Lịch sử đặt phòng</Breadcrumb.Item>
        </Breadcrumb>
        <div className="search-bar">
          <div className="search-bar__input-wrapper">
            <div className="search-bar__input-wrapper__item">
              <div className="search-bar__input-wrapper__item__label">
                TÊN CHỖ NGHỈ
              </div>
              <input
                placeholder="Nhập tên chỗ nghỉ, địa điểm"
                value={searchAccomName}
                onChange={(e) => {
                  setSearchAccomName(e.target.value);
                }}
              />
            </div>
            <div className="search-bar__input-wrapper__item">
              <div className="search-bar__input-wrapper__item__label">
                Ngày Nhận Phòng
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  size="small"
                  value={searchRecvDate}
                  onChange={(value) => {
                    setSearchRecvDate(value);
                  }}
                  // helperText={errorMessage}
                  onError={(newError) => setError(newError)}
                  format="DD/MM/YYYY"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "none",
                        border: "none",
                        outline: "none",
                      },
                      "&:hover fieldset": {
                        borderColor: "none",
                        border: "none",
                        outline: "none",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "none",
                        border: "none",
                        outline: "none",
                      },
                      "&.MuiFormHelperText-root": {
                        fontSize: "13px",
                      },
                      "&.Mui-error": {
                        fontSize: "13px",
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="search-bar__input-wrapper__item">
              <div className="search-bar__input-wrapper__item__label">
                Ngày Trả Phòng
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  size="small"
                  value={searchEndDate}
                  onChange={(value) => {
                    setSearchEndDate(value);
                  }}
                  // helperText={errorMessage}
                  onError={(newError) => setError(newError)}
                  format="DD/MM/YYYY"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "none",
                        border: "none",
                        outline: "none",
                      },
                      "&:hover fieldset": {
                        borderColor: "none",
                        border: "none",
                        outline: "none",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "none",
                        border: "none",
                        outline: "none",
                      },
                      "&.MuiFormHelperText-root": {
                        fontSize: "13px",
                      },
                      "&.Mui-error": {
                        fontSize: "13px",
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <Button
            className="cyan"
            preIcon={() => <GrPowerReset size={20} stroke="#fff" fill="#fff" />}
          >
            Đặt lại
          </Button>
        </div>

        <div className="two-contents">
          <div className="side-menu">
            <div
              onClick={() => {
                HandleChangeStateView("coming");
              }}
              className={`item ${roomStateShow === "coming" ? "selected" : ""}`}
            >
              Đặt phòng sắp đến
            </div>
            <div
              onClick={() => {
                HandleChangeStateView("passed");
              }}
              className={`item ${roomStateShow === "passed" ? "selected" : ""}`}
            >
              Đặt phòng đã qua
            </div>
            <div
              onClick={() => {
                HandleChangeStateView("canceled");
              }}
              className={`item ${
                roomStateShow === "canceled" ? "selected" : ""
              }`}
            >
              Đặt phòng đã hủy
            </div>
          </div>

          <div className="side-main">
            <div className="sort">
              <div className="sort__title">Sắp xếp theo</div>
              <div className="sort__wrapper">
                <div
                  className={`sort__wrapper__item ${
                    sortOption[0].selected ? "selected" : ""
                  }`}
                  onClick={() => {
                    handleSortOptionClick(0);
                  }}
                >
                  Gần nhất
                </div>
                <div
                  className={`sort__wrapper__item ${
                    sortOption[1].selected ? "selected" : ""
                  }`}
                  onClick={() => {
                    handleSortOptionClick(1);
                  }}
                >
                  Cũ nhất
                </div>
                <div
                  className={`sort__wrapper__item ${
                    sortOption[2].selected ? "selected" : ""
                  }`}
                  onClick={() => {
                    handleSortOptionClick(2);
                  }}
                >
                  Giá cao nhất
                </div>
                <div
                  className={`sort__wrapper__item ${
                    sortOption[3].selected ? "selected" : ""
                  }`}
                  onClick={() => handleSortOptionClick(3)}
                >
                  Giá thấp nhất
                </div>
              </div>
            </div>
            <div className="list">
              {sortedData.map((bookingHistory) => {
                if (
                  roomStateShow === "coming" &&
                  bookingHistory.state === "coming"
                ) {
                  return (
                    <HorizontalCard
                      DataToShow={bookingHistory}
                      type="history"
                      state="coming"
                    />
                  );
                } else if (
                  roomStateShow === "passed" &&
                  bookingHistory.state === "passed"
                ) {
                  return (
                    <HorizontalCard
                      DataToShow={bookingHistory}
                      type="history"
                      state="passed"
                    />
                  );
                } else if (
                  roomStateShow === "canceled" &&
                  bookingHistory.state === "canceled"
                ) {
                  return (
                    <HorizontalCard
                      DataToShow={bookingHistory}
                      type="history"
                      state="canceled"
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};
