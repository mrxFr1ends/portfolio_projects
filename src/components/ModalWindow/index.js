import React from 'react';
import cl from './index.module.css'

const ModalWindow = ({ children, setVisible }) => {
  return (
    <div
      className={cl.modal}
      onClick={() => setVisible(false)}
    >
      <div className={cl.modal__content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;