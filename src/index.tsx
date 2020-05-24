import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { Routes } from './routes';
import AuthProvider from './contexts/AuthContext';
import { ThemeProvider } from './styles';
import StoreProvider from './contexts/StoreContext';

ReactDOM.render(
    <AuthProvider>
        <StoreProvider>
            <ThemeProvider>
                <Routes />
            </ThemeProvider>
        </StoreProvider>
    </AuthProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
