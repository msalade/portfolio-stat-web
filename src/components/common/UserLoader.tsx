import React, { useContext, useState, useEffect, FC } from 'react';
import { CircularProgress } from '@material-ui/core';

import { AuthContext } from '../../contexts/AuthContext';
import { CenterWrapper, FullHeightWrapper } from './styled/Wrappers';

const UserLoader: FC = ({ children }) => {
    const [loading, setIsLoading] = useState(true);
    const user = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(!user);
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
