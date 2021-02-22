import Header from "../Header";
import { useUI } from "../../../contexts/UIContext";

import s from "./Layout.module.css";

const Layout = ({ children }) => {
  const { user, displayModal } = useUI();

  console.log(user, displayModal);

  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  );
};

export default Layout;
