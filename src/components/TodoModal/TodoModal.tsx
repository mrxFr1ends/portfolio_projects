import TodoForm from "../TodoForm/TodoForm";
import "./TodoModal.css";
import { ITodo } from "../../types/todo";

import { Dialog, DialogContent, Fade } from "@mui/material"

interface TodoModalProps {
    todo: ITodo;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, openModal, setOpenModal }) => {
    return (
        <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            closeAfterTransition
            className="todo_modal"
        >
            <Fade in={openModal}>
                <DialogContent sx={{
                    padding: 5, 
                    width: "auto",
                    maxWidth: "100% !important"
                }}>
                    <TodoForm 
                        item={todo} 
                        onSubmit={() => setOpenModal(false)} 
                    />
                </DialogContent>
            </Fade>
        </Dialog>
    // <CSSTransition
    //   in={openModal}
    //   classNames="modal"
    //   timeout={150}
    //   unmountOnExit
    // >
    //   <ModalWindow setVisible={setOpenModal} className="modal_window">
    //     {todo === null ? null : <TodoForm item={todo} onSubmit={(_: void) => setOpenModal(false)} />}
    //   </ModalWindow>
    // </CSSTransition>
    );
};

export default TodoModal;
