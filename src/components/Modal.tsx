import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  open,
  children,
  onClose,
  className = " ",
}: any) {
  const dialog: any = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}
