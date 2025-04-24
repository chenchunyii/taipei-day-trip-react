import welcomeImg from "../assets/welcome.png";

const WelcomeImg = () => {
  return (
    <div className="welcome_img_bg">
      <img className="welcome_img" src={welcomeImg} alt="台北一日遊"></img>
    </div>
  );
};

export default WelcomeImg;
