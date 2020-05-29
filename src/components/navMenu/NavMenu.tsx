import React, { FC } from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Home, ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { Link } from './style';
import app from '../../auth';

const NavMenu: FC = ({ children }) => {
    const { push } = useHistory();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" onClick={() => push('/')}>
                        <Home />
                    </IconButton>
                    <Link onClick={() => push('/transactions')}>
                        Transactions
                    </Link>
                    <Link onClick={() => push('/profile')}>Profile</Link>
                    <IconButton
                        onClick={() =>
                            app
                                .auth()
                                .signOut()
                                .then(() => {
                                    push('/login');
                                })
                        }
                    >
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {children}
        </>
    );
};

export default NavMenu;
