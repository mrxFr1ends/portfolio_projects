import React from 'react';
import cl from './Button.module.css';

const Button = ({onClick, className, icon}) => {
  return (
    <div className={[cl.button, className].join(' ')} onClick={onClick}>
      {icon}
    </div>
  );
};

export default Button;