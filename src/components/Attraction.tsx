import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigator from "./Navigator";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import axios from "axios";
import { AttractionInterface } from "../interfaces/attraction";

const Attraction = () => {
  const Server = import.meta.env.VITE_API_URL;
  const [attraction, setAttraction] = useState<AttractionInterface>();
  const [selected, setSelected] = useState<"A" | "B">("A");
  const [fee, setFee] = useState<number>(2000);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images = attraction?.images || [];
  const totalImages = images.length;

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };
  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };
  const handleButtonClick = (buttonId: "A" | "B") => {
    setSelected(buttonId);
    if (buttonId === "A") {
      setFee(2000);
    } else if (buttonId === "B") {
      setFee(2500);
    }
  };
  const isSelected = (buttonId: "A" | "B") => {
    return selected === buttonId;
  };

  const shiftImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const attractionId = window.location.pathname.split("/").pop();
        const response = await axios.get(
          `${Server}/attraction/${attractionId}`
        );
        const data = await response.data;
        setAttraction(data);
      } catch (error) {
        console.error("Error fetching attraction:", error);
      }
    };
    fetchAttraction();
  }, []);
  return (
    <>
      <Navigator />
      <div className="attraction">
        <div className="carousel_bg">
          <button
            className="carousel_prev_bt carousel_bt display_flex_center"
            onClick={handlePrevImage}
          >
            <FcPrevious />
          </button>
          <button
            className="carousel_next_bt carousel_bt display_flex_center"
            onClick={handleNextImage}
          >
            <FcNext />
          </button>
          <div className="carousel_index_bg display_flex_center">
            {images.map((_, index) => (
              <button
                className={`carousel_index ${
                  currentIndex === index ? "active" : ""
                }`}
                key={`img-btn:${index}`}
                onClick={() => shiftImage(index)}
              />
            ))}
          </div>
          {attraction?.images && attraction.images.length > 0 && (
            <img
              className="carousel_img"
              src={attraction.images[currentIndex]}
              alt={`Img:${currentIndex}`}
            />
          )}
        </div>
        <div className="attraction_detail display_flex">
          <h2 className="attraction_title">{attraction?.name}</h2>
          <div>
            <span>{attraction?.category}</span> at
            <span> {attraction?.mrt}</span>
          </div>
          <div className="booking_info">
            <p>訂購導覽行程</p>
            <p>以此景點為中心的一日行程，帶您探索城市角落故事</p>
            <p>
              選擇日期：<input placeholder="yyyy/mm/dd" type="date"></input>
            </p>
            <div className="display_flex">
              選擇時間：
              <button
                className={`half_day ${isSelected("A") ? "selected" : ""}`}
                onClick={() => handleButtonClick("A")}
              />
              <span>上半天</span>
              <button
                className={`half_day ${isSelected("B") ? "selected" : ""}`}
                onClick={() => handleButtonClick("B")}
              />
              <span>下半天</span>
            </div>
            <p>導覽費用：新台幣 ${fee}元</p>
            <form className="booking_form">
              <button className="booking_btn">開始預定行程</button>
            </form>
          </div>
        </div>
      </div>
      <hr className="attraction_pg_hr" />
      <div className="attraction_intro">
        <p>{attraction?.description}</p>
        <h3>景點地址：</h3>
        <p>{attraction?.address}</p>
        <h3>交通方式：</h3>
        <p>{attraction?.transport}</p>
      </div>
      <Footer />
    </>
  );
};

export default Attraction;
