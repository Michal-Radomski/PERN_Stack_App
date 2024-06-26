import React from "react";
import { Badge, Table } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import styled from "styled-components";
import { shallowEqual } from "react-redux";

import { getAllTodos } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { timestampToString } from "../utils/helpers";
import { ToDoDiv, TableContainer } from "./Dashboard";
import TokensInfo from "./TokensInfo";

const TableContainer2 = styled(TableContainer)`
  height: 60vh;
`;

const DashboardAllTodo = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const [jwtToken, allTodosFromRedux]: [string, { list: Array<Todo> }] = useAppSelector(
    (state: RootState) => [state?.auth?.authStatus?.jwtToken, state?.todos.allTodos],
    shallowEqual
  );

  const [userEmail, setUserEmail] = React.useState<string>("");
  const [allTodos, setAllTodos] = React.useState<Array<Todo> | null>(null);
  // console.log("allTodos:", allTodos)

  React.useEffect(() => {
    if (jwtToken) {
      const initialActions = async () => {
        const decodedToken = await jwt_decode(jwtToken);
        const { email } = decodedToken as Token;
        await setUserEmail(email);
        await dispatch(getAllTodos());
      };
      initialActions();
    }
  }, [dispatch, jwtToken]);

  React.useEffect(() => {
    if (allTodosFromRedux && Object.keys(allTodosFromRedux).length >= 1) {
      let allTodosFromReduxSorted = allTodosFromRedux.list.sort((a: Todo, b: Todo) => b.todo_id - a.todo_id);
      allTodosFromReduxSorted = allTodosFromReduxSorted.filter((todo) => JSON.stringify(todo.private) === "false");
      setAllTodos(allTodosFromReduxSorted);
    }
  }, [allTodosFromRedux]);

  const AllTodosTable = (): JSX.Element => {
    return (
      <Table striped bordered hover size="sm" variant="dark">
        <thead style={{ position: "sticky", top: "0" }}>
          <tr>
            <th style={{ width: "35px" }}>#</th>
            <th style={{ width: "auto" }}>Description</th>
            <th style={{ width: "125px" }}>User's Name</th>
            <th style={{ width: "125px" }}>User's mail</th>
            <th style={{ width: "175px" }}>Created At</th>
            <th style={{ width: "175px" }}>Updated At</th>
            <th style={{ width: "35px" }}>Id</th>
          </tr>
        </thead>
        <tbody>
          {allTodos &&
            allTodos[0]?.created_at &&
            allTodos?.map((todo, index) => {
              return (
                <tr key={index}>
                  <td>
                    {" "}
                    <Badge bg="primary" pill={true}>
                      {index + 1}
                    </Badge>
                  </td>
                  <td>{todo.description}</td>
                  <td>{todo.user_name}</td>
                  <td>{todo.user_email}</td>
                  <td>{timestampToString(todo.created_at)}</td>
                  <td>{todo.updated_at !== todo.created_at ? timestampToString(todo.updated_at) : "---"}</td>
                  <td>
                    <Badge bg={userEmail === todo.user_email ? "success" : "danger"}>{todo.todo_id}</Badge>
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
      <TokensInfo />
      <ToDoDiv>
        <h1 style={{ textAlign: "center", marginTop: "80px" }}>
          All Todos, Quantity:{" "}
          {allTodos && allTodos[0]?.created_at ? (
            <span className="span_bold">{allTodos.length}</span>
          ) : (
            <span className="span_bold">0</span>
          )}
        </h1>
        {allTodos && allTodos[0]?.created_at ? (
          <TableContainer2>
            <AllTodosTable />
          </TableContainer2>
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>Empty List</h1>
        )}
      </ToDoDiv>
    </React.Fragment>
  );
};

export default DashboardAllTodo;
