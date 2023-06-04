import React, { useEffect, useState, useCallback } from 'react';

interface ModalProps {
  children: React.ReactNode;
}

type OpenListener = (open: boolean) => void;

export const useModal = () => {
  const listeners: OpenListener[] = [];

  const closeModal = () => {
    listeners.forEach((listener) => listener(false));
  };

  const openModal = () => {
    listeners.forEach((listener) => listener(true));
  };

  const Modal: React.FC<ModalProps> = ({ children }) => {
    const [open, setOpen] = useState(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    useEffect(() => {
      listeners.push((value) => setOpen(value));

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    return (
      <div className="modal" style={{ display: !open ? 'none' : 'block'}}>
        <div className="modal-content">
        <button className="close-button" onClick={() => setOpen(false)}>
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
