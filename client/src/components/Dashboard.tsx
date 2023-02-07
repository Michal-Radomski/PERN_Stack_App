import React from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

import { getAllTodos, getUserTodos } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { timeStringRefactor } from "../utils/helpers";

const P = styled.p`
  font-size: 65%;
  margin-top: 80px;
  text-align: center;
`;

const ToDoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  max-width: 1260px;
  margin-left: auto;
  margin-right: auto;
`;

const Dashboard = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const [jwtToken, allTodosFromRedux, userTodosFromRedux]: [string, Array<Todo>, Array<Todo>] = useAppSelector(
    (state: RootState) => [state?.auth?.authStatus?.jwtToken, state?.todos.allTodos, state?.todos.userTodos]
  );

  const [token, setToken] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [allTodos, setAllTodos] = React.useState<Array<Todo> | null>(null);
  const [userTodos, setUserTodos] = React.useState<Array<Todo> | null>(null);

  React.useEffect(() => {
    if (jwtToken) {
      setToken(jwtToken);
      const decodedToken = jwt_decode(jwtToken);
      const { name } = decodedToken as Token;
      setUserName(name);
    }
  }, [jwtToken]);

  React.useEffect(() => {
    if (token) {
      dispatch(getUserTodos());
      dispatch(getAllTodos());
    }
  }, [dispatch, token]);

  React.useEffect(() => {
    if (allTodosFromRedux && userTodosFromRedux) {
      setAllTodos(allTodosFromRedux);
      setUserTodos(userTodosFromRedux);
    }
  }, [allTodosFromRedux, userTodosFromRedux]);

  const AllTodoTable = (): JSX.Element => {
    return (
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>User's Name</th>
            <th>User's mail</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {allTodos &&
            allTodos?.map((todo, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{todo.description}</td>
                  <td>{todo.user_name}</td>
                  <td>{todo.user_email}</td>
                  <td>{timeStringRefactor(todo.created_at)}</td>
                  <td>{timeStringRefactor(todo.updated_at)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  };

  const UserTodoTable = (): JSX.Element => {
    return (
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userTodos &&
            userTodos?.map((todo, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{todo.description}</td>
                  <td>{timeStringRefactor(todo.created_at)}</td>
                  <td>{timeStringRefactor(todo.updated_at)}</td>
                  <td>
                    <Button variant="warning">Update</Button>
                  </td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  };

  return (
    <React.Fragment>
      <P>
        JWT Token: <span className="span_bold">{token}</span>
      </P>
      <ToDoDiv>
        <h1 style={{ textAlign: "center", marginTop: "80px" }}>All Todos</h1>
        {allTodos && <AllTodoTable />}
      </ToDoDiv>
      <ToDoDiv>
        <h1 style={{ textAlign: "center", marginTop: "80px" }}>
          <span className="span_bold">{userName}'s</span> Todos
        </h1>
        {userTodos && <UserTodoTable />}
      </ToDoDiv>
    </React.Fragment>
  );
};

export default Dashboard;
