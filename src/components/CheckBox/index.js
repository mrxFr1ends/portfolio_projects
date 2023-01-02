import React from 'react';
import cl from './index.module.css';

const CheckBox = ({check, onChange, className, name, id, children, value, onClick}) => {
  const content = children ? children : value;
  return (
    <div className={cl.checkbox}>
      <input 
        type="checkbox"
        checked={check}
        onChange={onChange}
        id={id}
        name={name}
        className={[cl.checkbox__input, className].join(' ')}
        onClick={onClick}
      />
      {content && 
        <label 
          className={cl.checkbox__label}
          htmlFor={id}
        >
          {content}
        </label>
      }
    </div>
  );
};

export default CheckBox;