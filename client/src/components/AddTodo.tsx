import React from "react";
import { Button, FloatingLabel, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

import { addTodo, getUserTodos } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import addIcon from "../Icons/addIcon.svg";

const AddTodo = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const [userMessageFromRedux]: [string] = useAppSelector((state: RootState) => [state?.todos?.userTodos?.message]);
  // console.log({ userMessageFromRedux });

  const [show, setShow] = React.useState(false);
  const [description, setDescription] = React.useState<string>("");
  const [privateTodo, setPrivateTodo] = React.useState<boolean>(false);
  // console.log({ description, privateTodo });

  const changePrivateTodo = () => {
    setPrivateTodo(!privateTodo);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetDescription = async () => {
    await setDescription("");
    await setPrivateTodo(false);
    await handleClose();
  };

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const body = { description, privateTodo };
    // console.log("body:", body);
    await dispatch(addTodo(body));
    await handleClose();
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
          await setPrivateTodo(false);
        }, 2000);
      }
    }
  }, [dispatch, userMessageFromRedux]);

  return (
    <React.Fragment>
      <OverlayTrigger
        placement={"top"}
        overlay={
          <Tooltip id="add_todo_tooltip">
            Add new <strong>Todo</strong>
          </Tooltip>
        }
      >
        <Button
          variant="outline-danger"
          onClick={handleShow}
          size="sm"
          style={{ borderRadius: "50%", width: "56px", height: "56px", padding: 3 }}
        >
          <img src={addIcon} alt="Add Icon" width="48px" height="48px" />
        </Button>
      </OverlayTrigger>

      <Modal show={show} onHide={resetDescription}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Todo Description</Form.Label>
              <FloatingLabel label="Enter description" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  as="input"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  minLength={4}
                  required={true}
                />
              </FloatingLabel>
              {!description && <Form.Text className="text-muted">Enter description of your todo</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="private_todo"
                label="Private todo? "
                checked={privateTodo}
                onChange={changePrivateTodo}
              />
            </Form.Group>
          </Form>
          {!privateTodo && <p style={{ color: "red" }}>Your Todo will be public!</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetDescription}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(event) => onSubmitForm(event)}
            disabled={description === "" || description.length <= 3 ? true : false}
          >
            Add Todo
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddTodo;
