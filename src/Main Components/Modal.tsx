import "./Modal.css";
import ReactDOM from "react-dom";

interface props {
  children: React.ReactElement;
}

function Modal({ children }: props) {
  return ReactDOM.createPortal(
    <div className="modal-main">{children}</div>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
