import cl from "./index.module.css";

const Button = ({ className, value, type="button", ...otherProps }) => {
  const content = otherProps.children ? otherProps.children : value;
  return (
    <button
      type={type}
      className={[cl.button, className].join(" ")}
      {...otherProps}
    >
      {content}
    </button>
  );
};

export default Button;
