import { useEffect, useRef } from "react";
import Icon from "./Icon";

export default function DetailDialog({ title, eyebrow, children, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="detail-dialog" aria-labelledby="detail-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
    }}>
      <div className="dialog-heading">
        <p className="eyebrow">{eyebrow}</p>
        <button className="icon-button" type="button" aria-label="Close details" autoFocus onClick={onClose}><Icon name="close" /></button>
      </div>
      <h2 id="detail-title">{title}</h2>
      <div className="dialog-content">{children}</div>
      <button type="button" className="button button-outline" onClick={onClose}>Back to portfolio <Icon name="arrow" /></button>
    </dialog>
  );
}
