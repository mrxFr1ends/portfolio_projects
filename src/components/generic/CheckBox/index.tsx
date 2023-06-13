import cl from "./index.module.css";

interface CheckBoxProps {
  className?: string;
  value?: any; 
  children?: any;
  id?: any;
  [k: string]: any;
}

const CheckBox: React.FC<CheckBoxProps> = ({ className, value, children, id, ...otherProps }) => {
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
