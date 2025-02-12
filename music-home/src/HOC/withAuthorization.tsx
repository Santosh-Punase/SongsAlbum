import React, { FC } from "react";
import { Navigate } from "react-router-dom";

import { UserRole } from "../types/User";
import { getUser } from "../auth";

const withAuthorization = <P extends object>(allowedRoles: UserRole[]) => (Component: FC<P>) => {
  const WrappedComponent: FC<P> = (props) => {
    const user = getUser();

    if (!user) {
      return <Navigate to="/login" />
    }
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" />;
    }

      return <Component {...props} />;
    };

  return WrappedComponent;
};

export default withAuthorization;