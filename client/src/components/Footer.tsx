import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 82px;
`;

const Footer = (): JSX.Element => {
  return (
    <React.Fragment>
      <FooterContainer>Footer</FooterContainer>
    </React.Fragment>
  );
};

export default Footer;
