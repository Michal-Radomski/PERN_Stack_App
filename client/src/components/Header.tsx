import React from "react";
import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  position: relative;
  margin-left: 2px;
  margin-right: 3px;
  width: calc(100% - 5px);
  height: 58px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const Header = (): JSX.Element => {
  return (
    <React.Fragment>
      <Navbar bg="secondary" variant="dark">
        <HeaderContainer>
          <OverlayTrigger placement={"bottom"} overlay={<Tooltip id={"headerTooltip"}>Test</Tooltip>}>
            <Navbar.Brand to="/" as={NavLink}>
              PERN Stack Auth App
            </Navbar.Brand>
          </OverlayTrigger>

          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Tabela
            </Nav.Link>
          </Nav>
        </HeaderContainer>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
