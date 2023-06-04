import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

type OpenListener = () => void;

const ModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 15px;

  .modal-content {
    padding: 8em;
    position: relative;
  }

  .close-button {
    position: absolute;
    right: 0em;
    top: 0em;
    padding: 2em;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
  }
`;

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
    const [open, setOpen] = useState(false);

    const closeMe = () => {
      setOpen(false);
      if (onClose) onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMe();
      }
    };

    useEffect(() => {
      openListeners.push(() => setOpen(true));
      closeListeners.push(() => closeMe());

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    return (
      <ModalWrapper
        className="modal"
        style={{ display: !open ? "none" : "block" }}
      >
        <div className="modal-content">
          <button className="close-button" onClick={() => closeMe()}>
            &times;
          </button>
          {children}
        </div>
      </ModalWrapper>
    );
  };

  return {
    Modal,
    closeModal,
    openModal,
  };
};
