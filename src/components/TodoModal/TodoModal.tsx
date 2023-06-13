import ModalWindow from "../generic/ModalWindow";
import TodoForm from "../TodoForm/TodoForm";
import { CSSTransition } from "react-transition-group";
import "./TodoModal.css";
import { ITodo } from "../../types/todo";

interface TodoModalProps {
  todo: ITodo | null;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, openModal, setOpenModal }) => {
  return (
    <CSSTransition
      in={openModal}
      classNames="modal"
      timeout={150}
      unmountOnExit
    >
      <ModalWindow setVisible={setOpenModal} className="modal_window">
        {todo === null ? null : <TodoForm item={todo} onSubmit={(_: void) => setOpenModal(false)} />}
      </ModalWindow>
    </CSSTransition>
  );
};

export default TodoModal;
