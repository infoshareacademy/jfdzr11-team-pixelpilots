import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ visible, children, setVisible }) => {
  if (!visible) return null;

  return ReactDom.createPortal(
    <>
      <div onClick={() => setVisible(false)} className={styles.overlay} />
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
