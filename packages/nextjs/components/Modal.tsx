import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Add a class to the body to apply blur when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    // Cleanup function to remove the added class
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  // Close the modal when clicking outside the content
  const handleClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Render modal only if it's open
    isOpen && (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content">{children}</div>
      </div>
    )
  );
};

export default Modal;
