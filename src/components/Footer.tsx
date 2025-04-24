import { forwardRef } from "react";

const Footer = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <footer ref={ref} className="footer display_flex">
      COPYRIGHT © 2025 台北一日遊
    </footer>
  );
});

export default Footer;
