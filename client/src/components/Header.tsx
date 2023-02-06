import React from "react";
import { Button, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

import { logoutAction } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { timestampToString } from "../utils/helpers";

const HeaderContainer = styled.div`
  position: relative;
  margin-left: 1rem;
  margin-right: 1rem;
  width: calc(100% - 2rem);
  height: 74px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const TokenContainer = styled.div`
  color: white;
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  align-content: center;
  font-size: 95%;
`;

const TokenLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 1rem;
`;

const P = styled.p`
  margin-bottom: 0;
  span {
    font-weight: bold;
  }
`;

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [authStatus, jwtToken]: [boolean, string] = useAppSelector((state: RootState) => [
    state?.appState?.authStatus?.auth,
    state?.appState?.authStatus?.jwtToken,
  ]);
  // console.log("jwtToken;", jwtToken);

  const [token, setToken] = React.useState<Token>({
    id: "",
    name: "",
    email: "",
    iat: 0,
    exp: 0,
  });

  React.useEffect(() => {
    if (jwtToken) {
      const decodedToken = jwt_decode(jwtToken);
      setToken(decodedToken as Token);
    }
  }, [jwtToken]);

  const logout = async () => {
    await dispatch(logoutAction());
    await navigate("/");
  };

  return (
    <React.Fragment>
      <Navbar bg="secondary" variant="dark" fixed="top" style={{ padding: "0px" }}>
        <HeaderContainer>
          <OverlayTrigger
            placement={"bottom"}
            overlay={<Tooltip id={"headerTooltip"}>{authStatus ? "Dashboard Page" : "Home Page"}</Tooltip>}
          >
            <Navbar.Brand to={authStatus ? "/dashboard" : "/"} as={NavLink}>
              <h1>PERN Stack Auth App</h1>
            </Navbar.Brand>
          </OverlayTrigger>

          {authStatus && (
            <TokenContainer>
              <TokenLine>
                <P style={{ width: "100%", textAlign: "center" }}>
                  Id: <span>{token.id}</span>
                </P>
              </TokenLine>
              <TokenLine>
                <P>
                  Name: <span>{token.name}</span>
                </P>
                <P>
                  Email: <span>{token.email}</span>
                </P>
              </TokenLine>
              <TokenLine>
                <P>
                  Iat: <span>{timestampToString(token.iat)}</span>
                </P>
                <P>
                  Exp: <span>{timestampToString(token.exp)}</span>
                </P>
              </TokenLine>
            </TokenContainer>
          )}

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
