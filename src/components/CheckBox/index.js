import cl from "./index.module.css";

const CheckBox = ({ className, children, value, id, ...otherProps }) => {
  const content = children ? children : value;
  return (
    <div className={cl.checkbox}>
      <input
        type="checkbox"
        className={[cl.checkbox__input, className].join(" ")}
        {...otherProps}
        id={id}
      />
      {content && (
        <label className={cl.checkbox__label} htmlFor={id}>
          {content}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
