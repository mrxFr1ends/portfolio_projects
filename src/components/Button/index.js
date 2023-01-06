import cl from "./index.module.css";

const Button = ({ className, value, children, type="button", ...otherProps }) => {
  const content = children ? children : value;
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
