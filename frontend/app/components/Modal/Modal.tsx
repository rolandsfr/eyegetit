import React, { useEffect, useState, useCallback } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

type OpenListener = () => void;

export const useModal = () => {
  const openListeners: OpenListener[] = [];
  const closeListeners: OpenListener[] = [];

  const closeModal = () => {
    closeListeners.forEach((listener) => listener());
  };

  const openModal = () => {
    openListeners.forEach((listener) => listener());
  };

  const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    const [open, setOpen] = useState(true);

    const closeMe = () => {
      setOpen(false);
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMe();
      }
    };

    useEffect(() => {
      openListeners.push(() => setOpen(true));
      closeListeners.push(() => closeMe());

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    return (
      <div className="modal" style={{ display: !open ? 'none' : 'block'}}>
        <div className="modal-content">
        <button className="close-button" onClick={() => closeMe()}>
            X
        </button>
        {children}
        </div>
      </div>
      );
  };

  return {
    Modal,
    closeModal,
    openModal,
  };
}
