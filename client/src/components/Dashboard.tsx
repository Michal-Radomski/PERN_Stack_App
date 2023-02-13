import React from "react";
import { Badge, Button, Table } from "react-bootstrap";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

import { getUserTodos } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { timeStringRefactor } from "../utils/helpers";
import TokensInfo from "./TokensInfo";
import AutoLogout from "./AutoLogout";
import AddTodo from "./AddTodo";

export const ToDoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  max-width: 1260px;
  margin-left: auto;
  margin-right: auto;
  overflow-y: scroll;
`;

export const TableContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 50vh;
  overflow-y: scroll;
`;

const Dashboard = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const [jwtToken, usersTodosFromRedux]: [string, { list: Array<Todo> }] = useAppSelector((state: RootState) => [
    state?.auth?.authStatus?.jwtToken,
    state?.todos.userTodos,
  ]);

  const [userName, setUserName] = React.useState<string>("");
  const [usersTodos, setUsersTodos] = React.useState<Array<Todo> | null>(null);
  // console.log("usersTodos:", usersTodos);

  React.useEffect(() => {
    if (jwtToken) {
      const initialActions = async () => {
        const decodedToken = await jwt_decode(jwtToken);
        const { name } = decodedToken as Token;
        await setUserName(name);
        await dispatch(getUserTodos());
      };
      initialActions();
    }
  }, [dispatch, jwtToken]);

  React.useEffect(() => {
    if (usersTodosFromRedux) {
      setUsersTodos(usersTodosFromRedux?.list);
    }
  }, [usersTodosFromRedux]);

  const UsersTodoTable = (): JSX.Element => {
    return (
      <Table striped bordered hover size="sm" variant="dark">
        <thead style={{ position: "sticky", top: "0" }}>
          <tr>
            <th style={{ width: "35px" }}>#</th>
            <th style={{ width: "auto" }}>Description</th>
            <th style={{ width: "175px" }}>Created At</th>
            <th style={{ width: "175px" }}>Updated At</th>
            <th style={{ width: "80px" }}>Update</th>
            <th style={{ width: "80px" }}>Delete</th>
            <th style={{ width: "35px" }}>Id</th>
          </tr>
        </thead>
        <tbody>
          {usersTodos &&
            usersTodos[0]?.created_at &&
            usersTodos?.map((todo, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Badge bg="primary" pill={true}>
                      {index + 1}
                    </Badge>
                  </td>
                  <td>{todo.description}</td>
                  <td>{timeStringRefactor(todo.created_at)}</td>
                  <td>{todo.updated_at !== todo.created_at ? timeStringRefactor(todo.updated_at) : "---"}</td>
                  <td>
                    <Button variant="warning" size="sm">
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Badge bg="success">{todo.todo_id}</Badge>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  };

  return (
    <AutoLogout>
      <React.Fragment>
        <TokensInfo />
        <ToDoDiv>
          <AddTodo />
          <h1 style={{ textAlign: "center", marginTop: "50px" }}>
            <span className="span_bold">{userName}'s</span> Todos
          </h1>
          {usersTodos && usersTodos[0]?.created_at ? (
            <TableContainer>
              <UsersTodoTable />
            </TableContainer>
          ) : (
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Your List is Empty</h1>
          )}
        </ToDoDiv>
      </React.Fragment>
    </AutoLogout>
  );
};

export default Dashboard;
