import Register from "./Register";

const Navigator = () => {
  return (
    <>
      <div className="navigator_bg">
        <nav className="navigator display_flex">
          <a className="navigator_title" href="/">
            台北一日遊
          </a>
          <div className="navigator_links">
            <div className="navigator_book">預定行程</div>
            <div className="navigator_singup">登入/註冊</div>
          </div>
        </nav>
        <Register />
      </div>
      <nav className="nv-bg" />
    </>
  );
};

export default Navigator;
