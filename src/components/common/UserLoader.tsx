import React, { useContext, useState, useEffect, FC } from 'react';
import { CircularProgress } from '@material-ui/core';

import { AuthContext } from '../../contexts/AuthContext';
import { CenterWrapper, FullHeightWrapper } from './styled/Wrappers';
import useStore from '../../hooks/useStore';

const UserLoader: FC = ({ children }) => {
    const [loading, setIsLoading] = useState(true);
    const {
        currencyStore: { getAllCurrencies },
        transactionStore: { getMyTransactions },
        userStore: { getUser },
        analiticStore: { getCurrenciesStat }
    } = useStore();
    const user = useContext(AuthContext);

    useEffect(() => {
        if (user !== undefined) {
            if (!!user && user.uid) {
                getAllCurrencies();
                getMyTransactions();
                getUser().then(user => {
                    getCurrenciesStat(user.currency.symbol);
                });
            }

            setIsLoading(false);
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
