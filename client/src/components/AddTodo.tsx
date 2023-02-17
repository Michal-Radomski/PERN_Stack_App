import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { addTodo, getUserTodos } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const AddTodo2 = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const [userMessageFromRedux]: [string] = useAppSelector((state: RootState) => [state?.todos?.userTodos?.message]);
  // console.log({ userMessageFromRedux });

  const [show, setShow] = React.useState(false);
  const [description, setDescription] = React.useState<string>("");
  const [privateTodo, setPrivateTodo] = React.useState<boolean>(false);
  // console.log({ description });

  const changePrivateTodo = () => {
    setPrivateTodo(!privateTodo);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetDescription = async () => {
    await setDescription("");
    await handleClose();
  };

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const body = { description: description };
    dispatch(addTodo(body));
  };

  React.useEffect(() => {
    if (userMessageFromRedux) {
      const messageStatusArray = userMessageFromRedux.split(",");
      const messageStatus = messageStatusArray[0];
      // console.log({ messageStatus });
      if (messageStatus === "201") {
        setTimeout(async () => {
          await setDescription("");
          await dispatch(getUserTodos());
        }, 2000);
      }
    }
  }, [dispatch, userMessageFromRedux]);

  return (
    <React.Fragment>
      {/* <form className="d-flex" onSubmit={onSubmitForm} style={{ marginTop: "80px", width: "100%" }}>
        <input
          type="text"
          className="form-control"
          value={description}
          placeholder="Enter description"
          onChange={(event) => setDescription(event.target.value)}
        />
        <button className="btn btn-success btn-sm" style={{ width: "100px" }}>
          Add Todo
        </button>
      </form> */}

      <Button variant="warning" onClick={handleShow} size="sm">
        Update
      </Button>

      <Modal show={show} onHide={resetDescription}>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetDescription}>
            Close
          </Button>
          <Button
            variant="primary"
            // onClick={(event) => updateDescription(event)}
            // disabled={
            //   (todo.description === description && todo.private === privateTodo) || description === "" ? true : false
            // }
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddTodo2;
