import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";

const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [authStatus, jwtToken, refreshToken]: [boolean, string, string] = useAppSelector((state: RootState) => [
    state?.auth?.authStatus?.auth,
    state?.auth?.authStatus?.jwtToken,
    state?.auth?.authStatus?.refreshToken,
  ]);

  let location = useLocation();

  if (!authStatus && !jwtToken && !refreshToken) {
    return (
      <React.Fragment>
        <Navigate to="/" state={{ from: location }} replace={true} />
      </React.Fragment>
    );
  }
  return children;
};

export default PrivateRoute;
