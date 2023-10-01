"use client"
import Popup from '@/components/popupcomponents/Popup';
import React, { useState } from 'react'

const logout = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
    };
  
  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <h2>Popup Content</h2>
        <p>This is the content of your popup.</p>
      </Popup>
    </div>
  );
}

export default logout