import React from "react";
import { Button, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { logoutAction } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const HeaderContainer = styled.div`
  position: relative;
  margin-left: 1rem;
  margin-right: 1rem;
  width: calc(100% - 2rem);
  height: 58px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [authStatus]: [boolean] = useAppSelector((state: RootState) => [state?.appState?.authStatus?.auth]);
  // console.log("authStatus;", authStatus);

  const logout = async () => {
    await dispatch(logoutAction());
    await navigate("/login");
  };

  return (
    <React.Fragment>
      <Navbar bg="secondary" variant="dark" fixed="top">
        <HeaderContainer>
          <OverlayTrigger
            placement={"bottom"}
            overlay={<Tooltip id={"headerTooltip"}>{authStatus ? "Dashboard Page" : "Login Page"}</Tooltip>}
          >
            <Navbar.Brand to={authStatus ? "/dashboard" : "/login"} as={NavLink}>
              <h1>PERN Stack Auth App</h1>
            </Navbar.Brand>
          </OverlayTrigger>
          <Nav>
            {!authStatus && (
              <React.Fragment>
                <Nav.Link to="/login" as={NavLink}>
                  Login
                </Nav.Link>
                <Nav.Link to="/register" as={NavLink}>
                  Register
                </Nav.Link>
              </React.Fragment>
            )}
            {authStatus && (
              <React.Fragment>
                <Nav.Link to="/dashboard" as={NavLink}>
                  Dashboard
                </Nav.Link>
                <Button onClick={logout} variant="outline-light">
                  Logout
                </Button>
              </React.Fragment>
            )}
          </Nav>
        </HeaderContainer>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
