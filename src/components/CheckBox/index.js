import React from 'react';
import cl from './index.module.css';

const CheckBox = ({check, setCheck, onClick, className}) => {
  return (
    <div className={[className, cl.checkbox_round].join(' ')} onClick={onClick}>
      <input 
        type="checkbox"
        checked={check}
        onChange={setCheck}
      />
    </div>
  );
};

export default CheckBox;