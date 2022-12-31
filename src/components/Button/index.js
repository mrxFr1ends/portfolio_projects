import React from 'react';
import cl from './index.module.css';

const Button = ({onClick, className, children}) => {
  return (
    <div 
      className={[cl.button, className].join(' ')} onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;