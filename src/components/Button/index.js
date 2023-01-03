import cl from "./index.module.css";

const Button = ({ onClick, className, value, children, type = "button" }) => {
  const content = children ? children : value;
  return (
    <button
      type={type}
      className={[cl.button, className].join(" ")}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
