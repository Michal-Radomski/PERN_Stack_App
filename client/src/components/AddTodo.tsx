import React from "react";
import { addTodo } from "../redux/actions";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

const AddTodo = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const [jwtToken, usersTodosFromRedux]: [string, { list: Array<Todo> }] = useAppSelector((state: RootState) => [
    state?.auth?.authStatus?.jwtToken,
    state?.todos.userTodos,
  ]);

  const [description, setDescription] = React.useState<string>("");
  // console.log({ description });

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const body = { description: description };
    dispatch(addTodo(body));
  };

  React.useEffect(() => {
    setDescription("");
  }, []);

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
        <button className="btn btn-success btn-sm" style={{ width: "100px" }}>
          Add Todo
        </button>
      </form>
    </React.Fragment>
  );
};

export default AddTodo;
