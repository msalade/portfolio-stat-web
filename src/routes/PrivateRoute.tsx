import React, { useContext, useEffect } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

const unAuthRoute = ['/login', '/register'];

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
    const user = useContext(AuthContext);
    const { pathname } = useLocation();
    const { push } = useHistory();

    const isUnAuthRoute = unAuthRoute.some(path => path === pathname);

    useEffect(() => {
        if (!!user && isUnAuthRoute) {
            push('/');
        }

        if (!user) {
            push('/login');
        }
    }, []);

    return <Route {...rest} render={props => <RouteComponent {...props} />} />;
};

export default PrivateRoute;
