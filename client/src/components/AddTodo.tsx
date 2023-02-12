import React from "react";
import { Button } from "react-bootstrap";

const AddTodo = (): JSX.Element => {
  const [description, setDescription] = React.useState<string>("");
  console.log({ description });

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <form className="d-flex" onSubmit={onSubmitForm} style={{ marginTop: "80px", width: "100%" }}>
        <input
          type="text"
          className="form-control"
          value={description}
          placeholder="Enter description"
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button variant="success" size="sm" style={{ width: "100px" }}>
          Add Todo
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddTodo;
