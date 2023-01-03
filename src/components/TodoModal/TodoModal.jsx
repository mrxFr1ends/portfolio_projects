import ModalWindow from "../ModalWindow";
import TodoForm from "../TodoForm/TodoForm";
import { CSSTransition } from "react-transition-group";
import "./TodoModal.css";

const TodoModal = ({ todo, openModal, setOpenModal }) => {
  return (
    <CSSTransition
      in={openModal}
      classNames="modal"
      timeout={150}
      unmountOnExit
    >
      <ModalWindow setVisible={setOpenModal} className="modal_window">
        <TodoForm item={todo} onSubmit={_ => setOpenModal(false)} />
      </ModalWindow>
    </CSSTransition>
  );
};

export default TodoModal;
