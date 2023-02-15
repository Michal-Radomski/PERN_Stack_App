import React from "react";
import { Button, Modal } from "react-bootstrap";

import { getUserTodos, updateTodo } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";

const EditTodo = ({ todo }: { todo: Todo }): JSX.Element => {
  // console.log({ todo });
  const dispatch: AppDispatch = useAppDispatch();

  const [show, setShow] = React.useState(false);
  const [description, setDescription] = React.useState<string>(todo.description);
  // console.log({ description });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateDescription = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await dispatch(updateTodo(todo.todo_id, description));
      setTimeout(async () => {
        await dispatch(getUserTodos());
      }, 2000);
    } finally {
      await handleClose();
    }
  };

  const resetDescription = async () => {
    await setDescription(todo.description);
    await handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="warning" onClick={handleShow} size="sm">
        Update
      </Button>

      <Modal show={show} onHide={resetDescription}>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              minLength={4}
              required={true}
              placeholder="Enter description"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetDescription}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(event) => updateDescription(event)}
            disabled={todo.description === description ? true : false}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default EditTodo;
