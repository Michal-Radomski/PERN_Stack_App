import React from "react";
import styled from "styled-components";
import { getAllTodos, getUserTodos } from "../redux/actions";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

const P = styled.p`
  font-size: 65%;
  margin-top: 80px;
  text-align: center;
`;

const Dashboard = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const [jwtToken]: [string] = useAppSelector((state: RootState) => [state?.auth?.authStatus?.jwtToken]);

  const [token, setToken] = React.useState<string>("");

  React.useEffect(() => {
    if (jwtToken) {
      setToken(jwtToken);
    }
  }, [jwtToken]);

  React.useEffect(() => {
    dispatch(getUserTodos);
    dispatch(getAllTodos);
  }, [dispatch]);

  return (
    <React.Fragment>
      <P>
        JWT Token: <span className="span_bold">{token}</span>
      </P>
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>Welcome to the Dashboard of the PERN Stack Auth App</h1>
    </React.Fragment>
  );
};

export default Dashboard;
