import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { Routes } from './routes';
import AuthProvider from './contexts/AuthContext';
import { ThemeProvider } from './styles';

ReactDOM.render(
    <AuthProvider>
        <ThemeProvider>
            <Routes />
        </ThemeProvider>
    </AuthProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
