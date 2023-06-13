import cl from "./index.module.css";

interface ButtonProps {
    className?: string;
    value?: any; 
    children?: any;
    type?: "button" | "submit" | "reset" | undefined;
    [k: string]: any;
}

const defaultProps: ButtonProps = {
    type: "button"
}

const Button: React.FC<ButtonProps> = ({ className, value, children, type, ...otherProps } = defaultProps) => {
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
