import "./Modal.css";
import ReactDOM from "react-dom";
import { MouseEvent } from "react";

interface props {
  children: React.ReactElement;
  onClose: () => void;
}

function Modal({ children, onClose }: props) {
  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return ReactDOM.createPortal(
    <div className="modal-main" onClick={handleOverlayClick}>
      {children}
    </div>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
