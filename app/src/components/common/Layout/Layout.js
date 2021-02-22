import { useEffect } from "react";

import { useUI } from "../../../contexts/UIContext";
import { AuthView } from "../../auth";

import { Modal } from "../../ui";
import Header from "../Header";

import s from "./Layout.module.css";

const Layout = ({ children }) => {
  const { user, displayModal, openModal, closeModal } = useUI();

  useEffect(() => {
    if (!user) openModal();
  }, []);

  return (
    <div className={s.root}>
      <Modal open={displayModal} onClose={closeModal}>
        <AuthView />
      </Modal>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  );
};

export default Layout;
