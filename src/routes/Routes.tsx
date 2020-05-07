import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { Home } from '../components/home';
import { Register } from '../components/register';
import { Login } from '../components/login';
import { Wrapper } from './styled';

const Routes = () => (
    <Wrapper>
        <Router>
            <PrivateRoute component={Home} exact path="/" />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
        </Router>
    </Wrapper>
);

export default Routes;
