import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Spinner } from '../Spinner/Spinner';
import { AuthContext } from '../../context/AuthContext';

interface SecuredRouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

export const SecuredRoute = (props: SecuredRouteProps) => {
  const context = useContext(AuthContext);
  const { exact, component: ComponentNode, path } = props;
  return (
    <Route
      exact={exact || false}
      path={path}
      render={routeProps => {
        if (context.checkingSession) {
          return <Spinner text="Checking Session" />;
        }
        if (!context.isAuthenticated) {
          context.login();
          return null;
        }
        return <ComponentNode {...routeProps} />;
      }}
    />
  );
};
