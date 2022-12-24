import React from 'react';
import cl from './ModalWindow.module.css'

const ModalWindow = ({ children, visible, setVisible }) => {
  return (
    <div
      className={[cl.modal, visible ? cl.modal__active : ""].join(' ')}
      onClick={() => setVisible(false)}
    >
      <div className={cl.modal__content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;