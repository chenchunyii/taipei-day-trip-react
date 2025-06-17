import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Register from "./Register";

const Navigator = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { member, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowLogout(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div className="navigator_bg">
        <nav className="navigator display_flex">
          <a className="navigator_title" href="/">
            台北一日遊
          </a>
          <div className="navigator_links">
            <div
              className="navigator_book cursor_pointer"
              onClick={() => (window.location.href = "/booking")}
            >
              預定行程
            </div>

            <div>
              {member ? (
                <div>
                  Hi{" "}
                  <span
                    className="username cursor_pointer"
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                  >
                    {member.Nickname}
                    {showLogout && (
                      <div
                        className="logout cursor_pointer"
                        onClick={handleLogout}
                      >
                        登出
                      </div>
                    )}
                  </span>
                  ，歡迎回來
                </div>
              ) : (
                <div
                  className="navigator_singup cursor_pointer"
                  onClick={() => setOpenRegister(true)}
                >
                  登入/註冊
                </div>
              )}
            </div>
          </div>
        </nav>
        <Register
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
        />
      </div>
      <nav className="nv-bg" />
    </>
  );
};

export default Navigator;
