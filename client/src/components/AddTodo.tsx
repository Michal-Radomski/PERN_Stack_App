import React from "react";

import { addTodo, getUserTodos } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const AddTodo = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const [userMessageFromRedux]: [string] = useAppSelector((state: RootState) => [state?.todos?.userTodos?.message]);
  // console.log({ userMessageFromRedux });

  const [description, setDescription] = React.useState<string>("");
  // console.log({ description });

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
