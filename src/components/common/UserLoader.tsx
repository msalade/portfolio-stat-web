import React, { useContext, useState, useEffect, FC } from 'react';
import { CircularProgress } from '@material-ui/core';

import { AuthContext } from '../../contexts/AuthContext';
import { CenterWrapper, FullHeightWrapper } from './styled/Wrappers';
import useStore from '../../hooks/useStore';

const UserLoader: FC = ({ children }) => {
    const [loading, setIsLoading] = useState(true);
    const {
        currencyStore: { getAll },
        transactionStore: { getAllTransactions },
        useStore: { getByEmail }
    } = useStore();
    const user = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(!user);

        if (!!user && user.uid) {
            getAll();
            getAllTransactions(user.email || '');
            getByEmail(user.email || '');
        }
    }, [user]);

    return loading ? (
        <FullHeightWrapper>
            <CenterWrapper>
                <CircularProgress />
            </CenterWrapper>
        </FullHeightWrapper>
    ) : (
        <>{children}</>
    );
};

export default UserLoader;
