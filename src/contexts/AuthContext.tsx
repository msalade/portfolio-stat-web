import React, { useEffect, useState, createContext, FC } from 'react';
import { User } from 'firebase';

import app from '../auth';

export const AuthContext = createContext<User | null>(null);

const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(newUser => setUser(newUser));       
    }, [])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;