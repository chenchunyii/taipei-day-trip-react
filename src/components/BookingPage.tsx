import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import { BookingInfo } from "../interfaces/booking";
import Footer from "./Footer";
import Navigator from "./Navigator";

const BookingPage = () => {
  const [bookingData, setBookingData] = useState<BookingInfo | null>(null);
  const { member } = useAuth();
  const Server = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `${Server}/attraction/booking/user/${member?.Id}`
        );
        const data = await response.data;
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchBookingData();
  }, [member?.Id]);

  const handleDeleteBooking = async () => {
    try {
      const response = await axios.put(
        `${Server}/attraction/booking/user/${member?.Id}`
      );
      if (response.status === 200) {
        setBookingData(null);
      } else {
        alert("刪除預訂失敗，請稍後再試");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("刪除預訂失敗，請稍後再試");
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const formateDayPeriod = (dayPeriod: string | undefined) => {
    if (!dayPeriod) return "";
    return dayPeriod === "am"
      ? "上午 9:00 - 下午 4:00"
      : "下午 1:00 - 下午 6:00";
  };

  return (
    <>
      <Navigator />
      <div className="booking_page_container">
        {bookingData ? (
          <>
            <div className="bp_bg">
              <div className="bp_container">
                <h3 className="bp_header">
                  您好 {member?.Nickname}{" "}
                  <span className="bp_header_username"></span>
                  ，待預訂的行程如下：
                </h3>
                <div className="bp_info_container ">
                  <div className="bp_info_img_container">
                    <img
                      className="bp_info_img"
                      src={bookingData?.attractionImages}
                      alt="Attraction"
                    />
                  </div>
                  <div className="bp_info">
                    <div className="bp_info_att_name">
                      台北一日遊：{bookingData?.attractionName}
                    </div>
                    <div>
                      日期：
                      <span className="bp_info_content">
                        {formatDate(bookingData?.bookingDate)}
                      </span>
                    </div>
                    <div>
                      時間：
                      <span className="bp_info_content">
                        {formateDayPeriod(bookingData?.dayPeriod)}
                      </span>
                    </div>
                    <div>
                      費用：
                      <span className="bp_info_content">
                        {bookingData?.amount}
                      </span>
                    </div>
                    <div>
                      地點：
                      <span className="bp_info_content">
                        {bookingData?.attractionAddress}
                      </span>
                    </div>
                  </div>
                  <div className="bp_info_delete cursor_pointer">
                    <FaRegTrashCan onClick={handleDeleteBooking} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bp_bg bp_user_info">
              <div className="bp_container">
                <h3 className="bp_header">您的聯絡資訊</h3>
                <form action="" className="bp_user_info_form">
                  <div className="bp_ur_info">
                    聯絡姓名：
                    <input
                      type="text"
                      name="contactName"
                      className="bp_input"
                      placeholder="請輸入姓名"
                    />
                  </div>
                  <div className="bp_ur_info">
                    聯絡信箱：
                    <input
                      type="email"
                      name="contactEmail"
                      className="bp_input"
                      placeholder="請輸入電子信箱"
                    />
                  </div>
                  <div className="bp_ur_info">
                    手機號碼：
                    <input
                      type="tel"
                      name="contactPhone"
                      className="bp_input"
                      placeholder="請輸入手機號碼"
                    />
                  </div>
                  <div className="bp_ur_info">
                    請保持手機暢通，準時到達，導覽人員將用手機與您聯繫，務必留下正確的聯絡方式。
                  </div>
                </form>
              </div>
            </div>
            <div className="bp_bg bp_credit_card_info">
              <div className="bp_container">
                <h3 className="bp_header">信用卡付款資訊</h3>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bp_bg">
              <div className="bp_container">
                <h3 className="bp_header">目前沒有預訂行程</h3>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
export default BookingPage;
