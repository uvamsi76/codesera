// components/Popup.js

import React from 'react';
import "./popup.css"

function Popup({ isOpen, onClose, children }:any) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
