import React from "react";
import { Button, ButtonGroup, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

import { changeMessage, deleteUser, logoutAction, refreshTokenAction } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { timestampToString } from "../utils/helpers";

const HeaderContainer = styled.div`
  position: relative;
  margin-left: 1rem;
  margin-right: 1rem;
  width: calc(100% - 2rem);
  height: 82px;
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
  font-size: 85%;
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
  const location = useLocation();
  const path = location?.pathname;
  // console.log({ path });

  const dispatch: AppDispatch = useAppDispatch();
  const [authStatus, jwtToken, refreshTokenFromRedux]: [boolean, string, string] = useAppSelector((state: RootState) => [
    state?.auth?.authStatus?.auth,
    state?.auth?.authStatus?.jwtToken,
    state?.auth?.authStatus?.refreshToken,
  ]);
  // console.log("jwtToken;", jwtToken);

  const [token, setToken] = React.useState<Token>({
    id: "",
    name: "",
    email: "",
    iat: 0,
    exp: 0,
  });
  const [refreshToken, setRefreshToken] = React.useState<Token>({
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

  React.useEffect(() => {
    if (refreshTokenFromRedux) {
      const decodedToken = jwt_decode(refreshTokenFromRedux);
      setRefreshToken(decodedToken as Token);
    }
  }, [refreshTokenFromRedux]);

  const logout = async () => {
    await dispatch(logoutAction());
    await navigate("/");
  };

  const refreshTokenButton = async () => {
    await dispatch(changeMessage(""));
    await dispatch(refreshTokenAction());
  };

  const deleteAccount = async () => {
    if (
      window.confirm(`Do you really want to delete your account?\n
    All your Todos will be REMOVED`)
    ) {
      await dispatch(deleteUser());
      await setTimeout(async () => {
        await dispatch(logoutAction());
        await navigate("/");
      }, 2000);
    }
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
                  Token Iat: <span>{timestampToString(token.iat)}</span>
                </P>
                <P>
                  Token Exp: <span>{timestampToString(token.exp)}</span>
                </P>
              </TokenLine>
              <TokenLine>
                <P>
                  Refresh Token Iat: <span>{timestampToString(refreshToken.iat)}</span>
                </P>
                <P>
                  Refresh Token Exp: <span>{timestampToString(refreshToken.exp)}</span>
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
                <Nav.Link to="/dashboard" as={NavLink} style={{ color: path === "/dashboard" ? "lightyellow" : "" }}>
                  <span className="span_bold">{token.name}'s</span> Todos
                </Nav.Link>
                <Nav.Link
                  to="/dashboard/all-todos"
                  as={NavLink}
                  style={{ color: path === "/dashboard/all-todos" ? "lightyellow" : "" }}
                >
                  All Todos
                </Nav.Link>
                <ButtonGroup>
                  <Button onClick={logout} variant="outline-light" size="sm">
                    Logout
                  </Button>
                  <Button onClick={refreshTokenButton} variant="outline-warning" size="sm">
                    Refresh Token
                  </Button>

                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                      <Tooltip id="delete_user_tooltip">
                        Your account and all your todos <strong>will be REMOVED</strong>
                      </Tooltip>
                    }
                  >
                    <Button onClick={deleteAccount} variant="danger" size="sm">
                      Delete Account
                    </Button>
                  </OverlayTrigger>
                </ButtonGroup>
              </React.Fragment>
            )}
          </Nav>
        </HeaderContainer>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
