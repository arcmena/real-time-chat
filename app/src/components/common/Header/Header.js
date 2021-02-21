import s from "./Header.module.css";

import Logo from "../../../assets/img/arctichat-logo-white.png";

const Header = () => (
  <div className={s.root}>
    <img src={Logo} alt="actichat" className={s.logo} />
  </div>
);

export default Header;
