import cl from "./index.module.css";

const TextField = ({ value, onChange, title, className, ...otherProps }) => {
  return (
    <div className={cl.text_field}>
      <input
        className={[className, cl.text_field__input].join(" ")}
        type="text"
        placeholder=" "
        value={value}
        onChange={onChange}
        {...otherProps}
      />
      <label className={cl.text_field__label}>{title}</label>
    </div>
  );
};

export default TextField;
