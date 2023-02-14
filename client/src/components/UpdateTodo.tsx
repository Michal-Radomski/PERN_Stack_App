import React from "react";
import { Button, Modal } from "react-bootstrap";

import customAxiosInstance from "../utils/axiosInterceptor";

const EditTodo = ({ todo }: { todo: Todo }): JSX.Element => {
  // console.log({ todo });

  const [show, setShow] = React.useState(false);
  const [description, setDescription] = React.useState<string>(todo.description);
  // console.log({ description });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateDescription = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { description };
      // console.log("body:", body);
      const URL = `/todos/${todo.todo_id}`;
      await customAxiosInstance
        .put(URL, body)
        .then((response) => {
          const dataToPass = response?.data;
          // console.log("response.status:", response.status);
          if (response.status === 200) {
            console.log("dataToPass:", dataToPass);
            // dispatch({ type: ADD_TODO, payload: dataToPass });
          }
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status !== 201) {
              const data = error.response.data;
              console.log({ data });
            }
          }
        });
    } finally {
      handleClose();
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
              minLength={3}
              required={true}
              placeholder="Enter description"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetDescription}>
            Close
          </Button>
          <Button variant="primary" onClick={(event) => updateDescription(event)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default EditTodo;
