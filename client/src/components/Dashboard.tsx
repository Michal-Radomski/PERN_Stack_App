import React from "react";
import { Badge, Button, Table } from "react-bootstrap";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

import { deleteTodoAction, getUserTodos } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { timestampToString } from "../utils/helpers";
import TokensInfo from "./TokensInfo";
import AutoLogout from "./AutoLogout";
import AddTodo from "./AddTodo";
import UpdateTodo from "./UpdateTodo";
import trueIcon from "../Icons/trueIcon.svg";
import falseIcon from "../Icons/falseIcon.svg";

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
  margin-bottom: 0;
  width: 100%;
  height: 50vh;
  overflow-y: scroll;
`;

const TdDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 0.25rem;
`;

const HeaderDiv = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  position: relative;
  h1 {
    text-align: center;
  }
  div {
    position: absolute;
    right: 0;
  }
`;

const Dashboard = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const [jwtToken, userTodosFromRedux, userMessageFromRedux]: [string, { list: Array<Todo> }, string] = useAppSelector(
    (state: RootState) => [state?.auth?.authStatus?.jwtToken, state?.todos.userTodos, state?.todos?.userTodos?.message]
  );
  // console.log("userTodosFromRedux:", userTodosFromRedux);

  const [userName, setUserName] = React.useState<string>("");
  const [usersTodos, setUsersTodos] = React.useState<Array<Todo> | null>(null);
  // console.log("usersTodos:", usersTodos);

  const deleteTodo = async (id: number) => {
    // console.log({ id });
    if (window.confirm(`Do you really want to DELETE todo id: ${id}?`)) {
      await dispatch(deleteTodoAction(id));
    }
  };

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
    if (userTodosFromRedux && Object.keys(userTodosFromRedux).length >= 1) {
      const userTodosFromReduxSorted = userTodosFromRedux.list.sort((a: Todo, b: Todo) => b.todo_id - a.todo_id);
      setUsersTodos(userTodosFromReduxSorted);
    }
  }, [userTodosFromRedux]);

  React.useEffect(() => {
    if (userMessageFromRedux) {
      const messageStatusArray = userMessageFromRedux.split(",");
      const messageStatus = messageStatusArray[0];
      // console.log({ messageStatus });
      if (messageStatus === "200") {
        setTimeout(async () => {
          await dispatch(getUserTodos());
        }, 2000);
      }
    }
  }, [dispatch, userMessageFromRedux]);

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
            <th style={{ width: "75px" }}>Private</th>
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
                  <td>{timestampToString(todo.created_at)}</td>
                  <td>{todo.updated_at !== todo.created_at ? timestampToString(todo.updated_at) : "---"}</td>
                  <td>
                    <UpdateTodo todo={todo} />
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => deleteTodo(todo.todo_id)}>
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Badge bg="success">{todo.todo_id}</Badge>
                  </td>
                  <td>
                    <TdDiv>
                      <img
                        width={20}
                        height={20}
                        src={JSON.stringify(todo.private) === "true" ? trueIcon : falseIcon}
                        alt="True or False Icon"
                      />{" "}
                      {JSON.stringify(todo.private)}
                    </TdDiv>
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
          <HeaderDiv>
            <h1>
              <span className="span_bold">{userName}'s</span> Todos, Quantity:{" "}
              {usersTodos && usersTodos[0]?.created_at ? (
                <span className="span_bold">{usersTodos.length}</span>
              ) : (
                <span className="span_bold">0</span>
              )}
            </h1>
            <div>
              <AddTodo />
            </div>
          </HeaderDiv>

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
