"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  if (!modalOpen) return null;

  const modalMaskStyle: {
    [key: string]: number | string;
  } = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const onClose = () => {
    setModalOpen(false);
  };

  const modalMask = <div style={modalMaskStyle} onClick={onClose}></div>;
  console.log("modal");
  return createPortal(
    <>
      {modalMask}
      {children}
    </>,
    document.body
  );
};

export default Modal;
