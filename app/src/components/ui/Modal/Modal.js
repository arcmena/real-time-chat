import Portal from "@reach/portal";

import s from "./Modal.module.css";

const Modal = ({ children, open }) => {
  return (
    <Portal>
      {open ? (
        <div className={s.root}>
          <div className={s.modal}>
            <div className={s.body}>{children}</div>
          </div>
        </div>
      ) : null}
    </Portal>
  );
};

export default Modal;
