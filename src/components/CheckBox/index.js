import React from 'react';
import cl from './index.module.css';

const CheckBox = ({check, setCheck, onClick, icon}) => {
  return (
    <label className={cl.checkbox} onClick={onClick}>
      <input 
        className={cl.checkbox__input} 
        type="checkbox"
        checked={check}
        onChange={setCheck} />
      <span className={cl.checkbox__icon}>
        {icon}
      </span>
    </label>
  );
};

export default CheckBox;