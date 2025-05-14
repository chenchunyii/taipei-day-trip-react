import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const Register = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="register_bg">
      <div className="register_top"></div>
      <h2 className="register_title">
        {showRegister ? "註冊會員帳號" : "登入會員帳號"}
      </h2>
      <IoIosCloseCircle className="register_close_btn" />
      <div
        className="login"
        style={{ display: showRegister ? "none" : "block" }}
      >
        <form action="" className="login_form">
          <input type="text" className="login_input" placeholder="請輸入帳號" />
          <input
            type="password"
            className="login_input"
            placeholder="請輸入密碼"
          />
          <input className="login_btn" type="submit" value="登入帳戶" />
        </form>
        <p className="register_text">
          還沒有帳戶？點此
          <span
            className="cursor_pointer point_text"
            onClick={() => setShowRegister(true)}
          >
            註冊
          </span>
        </p>
      </div>
      <div
        className="register"
        style={{ display: showRegister ? "block" : "none" }}
      >
        <form action="" className="register_form">
          <input
            type="text"
            className="register_input"
            placeholder="請輸入姓名"
          />
          <input
            type="text"
            className="register_input"
            placeholder="請輸入電子郵件"
          />
          <input
            type="password"
            className="register_input"
            placeholder="請輸入密碼"
          />
          <input className="register_btn" type="submit" value="註冊帳戶" />
        </form>
        <p className="login_text">
          已經有帳戶？點此
          <span
            className="cursor_pointer point_text"
            onClick={() => setShowRegister(false)}
          >
            登入
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
