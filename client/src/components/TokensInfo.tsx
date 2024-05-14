import React from "react";
import styled from "styled-components";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "../redux/hooks";

const P = styled.p`
  font-size: 65%;
  margin-top: 82px;
  margin-bottom: 0;
  text-align: center;
`;

const P2 = styled(P)`
  margin-top: 0;
`;

const TokensInfo = (): JSX.Element => {
  const [jwtToken, refreshTokenFromRedux]: [string, string] = useAppSelector(
    (state: RootState) => [state?.auth?.authStatus?.jwtToken, state?.auth?.authStatus?.refreshToken],
    shallowEqual
  );

  const [token, setToken] = React.useState<string>("");
  const [refreshToken, setRefreshToken] = React.useState<string>("");

  React.useEffect(() => {
    if (jwtToken) {
      setToken(jwtToken);
    }
  }, [jwtToken]);

  React.useEffect(() => {
    if (refreshTokenFromRedux) {
      setRefreshToken(refreshTokenFromRedux);
    }
  }, [refreshTokenFromRedux]);

  return (
    <React.Fragment>
      <P>
        JWT Token: <span className="span_bold">{token}</span>
      </P>
      <P2>
        JWT Refresh Token: <span className="span_bold">{refreshToken}</span>
      </P2>
    </React.Fragment>
  );
};

export default TokensInfo;
