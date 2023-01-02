import React from 'react';
import cl from './index.module.css'

const TextField = ({value, onChange, title, name, onKeyUp, className}) => {
  return (
    <div className={cl.text_field}>
      <input
        className={[className, cl.text_field__input].join(' ')}
        type="text"
        name={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      <label className={cl.text_field__label}>
        {title}
      </label>
    </div>
  );
};

export default TextField;