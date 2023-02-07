import React from "react";
import { getAllTodos, getUserTodos } from "../redux/actions";

import { useAppDispatch } from "../redux/hooks";

const Dashboard = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getUserTodos);
    dispatch(getAllTodos);
  }, [dispatch]);

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>Welcome to the Dashboard of the PERN Stack Auth App</h1>
    </React.Fragment>
  );
};

export default Dashboard;
