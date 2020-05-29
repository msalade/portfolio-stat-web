import React, { useEffect, useState, createContext, FC } from 'react';
import { User } from 'firebase';

import app from '../auth';

export const AuthContext = createContext<User | undefined | null>(undefined);

const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<User | undefined | null>(undefined);
    const [authFlag, setAuthFalg] = useState<boolean>(true);

    useEffect(() => {
        app.auth().onAuthStateChanged(newUser => setUser(newUser));
    }, []);

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            if (authFlag) {
                setAuthFalg(false);
                setUser(user);
            }
        });
    }, [authFlag]);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
