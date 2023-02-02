import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";

const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [authStatus]: [boolean] = useAppSelector((state: RootState) => [state?.appState?.authStatus?.auth]);
  let location = useLocation();

  if (!authStatus) {
    return (
      <React.Fragment>
        <Navigate to="/login" state={{ from: location }} replace={true} />
      </React.Fragment>
    );
  }
  return children;
};

export default PrivateRoute;