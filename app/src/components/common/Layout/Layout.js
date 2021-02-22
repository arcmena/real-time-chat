import Header from "../Header";

import s from "./Layout.module.css";

const Layout = ({ children }) => (
  <div className={s.root}>
    <Header />
    <main className={s.main}>{children}</main>
  </div>
);

export default Layout;
