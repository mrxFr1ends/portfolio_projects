import cl from "./index.module.css";

const ModalWindow = ({ children, setVisible, className }) => {
  return (
    <div className={cl.modal} onClick={() => setVisible(false)}>
      <div
        className={[className, cl.modal__content].join(" ")}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
