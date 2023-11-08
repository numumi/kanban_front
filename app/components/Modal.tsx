"use client";
import React, { useState } from "react";

type ModalProps = {
  children?: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalWrapperStyle: { [key: string]: string } = {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "2",
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    contain: "content",
  };

  return (
    <div style={modalWrapperStyle} onClick={onMaskClick}>
      {children}
    </div>
  );
};

export default Modal;
