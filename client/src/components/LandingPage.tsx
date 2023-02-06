import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LandingDiv = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const LandingPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <LandingDiv>
        <div className="jumbotron mt-5">
          <h1>Welcome to PERN Stack ToDo List</h1>
          <p>Sign In or Sign Up to start building your todo list</p>

          <Link to="/login">
            <Button variant="primary" size="lg" style={{ borderRadius: "0.5rem 0 0 0.5rem" }}>
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" size="lg" style={{ borderRadius: "0 0.5rem 0.5rem 0" }}>
              Register
            </Button>
          </Link>
        </div>
      </LandingDiv>
    </React.Fragment>
  );
};

export default LandingPage;
