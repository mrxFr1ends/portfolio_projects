import React from 'react';
import cl from './TextField.module.css'

const TextField = ({value, title, name, onChange, onKeyUp}) => {
  return (
    <div className={cl.text_field}>
      <input
        className={cl.text_field__input}
        type="text"
        id={name}
        name={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      <label className={cl.text_field__label} htmlFor={name}>
        {title}
      </label>
    </div>
  );
};

export default TextField;