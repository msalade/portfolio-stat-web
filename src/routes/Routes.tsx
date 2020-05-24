import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { Home } from '../components/home';
import { Register } from '../components/register';
import { Login } from '../components/login';
import { Transactions } from '../components/transactions';

import { Wrapper } from './styled';
import { NavMenu } from '../components/navMenu';
import UserLoader from '../components/common/UserLoader';

const Routes = () => (
    <Wrapper>
        <UserLoader>
            <Router>
                <Route component={Login} path="/login" />
                <Route component={Register} path="/register" />
                <NavMenu>
                    <PrivateRoute
                        component={Transactions}
                        path="/transactions"
                    />
                    <PrivateRoute component={Home} exact path="/" />
                </NavMenu>
            </Router>
        </UserLoader>
    </Wrapper>
);

export default Routes;
