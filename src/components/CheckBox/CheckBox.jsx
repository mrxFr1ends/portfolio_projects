import React from 'react';
import cl from './CheckBox.module.css';

const CheckBox = ({check, setCheck, icon}) => {
  return (
    <label className={cl.checkbox}>
      <input 
        className={cl.checkbox__input} 
        type="checkbox"
        defaultChecked={check}
        onChange={setCheck} />
      <span className={cl.checkbox__icon}>
        {icon}
      </span>
    </label>
  );
};

export default CheckBox;