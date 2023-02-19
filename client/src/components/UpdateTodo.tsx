import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { getUserTodos, updateTodo } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";

const EditTodo = ({ todo }: { todo: Todo }): JSX.Element => {
  // console.log({ todo });
  const dispatch: AppDispatch = useAppDispatch();

  const [show, setShow] = React.useState(false);
  const [description, setDescription] = React.useState<string>(todo.description);
  const [privateTodo, setPrivateTodo] = React.useState<boolean>(todo.private);
  // console.log({ description });

  const changePrivateTodo = () => {
    setPrivateTodo(!privateTodo);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateDescription = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { description, privateTodo };
      // console.log({ body });
      await dispatch(updateTodo(todo.todo_id, body));
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
          <Form onSubmit={updateDescription}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                as="input"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Form.Text className="text-muted">Enter description of your todo</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="private_todo"
                label="Private todo?"
                checked={privateTodo}
                onChange={changePrivateTodo}
              />
            </Form.Group>
            {!privateTodo && <p style={{ color: "red", marginBottom: "4px" }}>Your Todo is public!</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetDescription}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(event) => updateDescription(event)}
            disabled={
              (todo.description === description && todo.private === privateTodo) || description === "" ? true : false
            }
          >
            Update Todo
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default EditTodo;
