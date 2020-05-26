import React from 'react';
import { observer } from 'mobx-react';

import ProfileView from './ProfileView';
import useStore from '../../hooks/useStore';

const ProfileContainer = () => {
    const {
        userStore: {
            country,
            currency,
            email,
            gender,
            name,
            timezone,
            username,
            onUserChange,
            editUser
        },
        currencyStore: { currencies }
    } = useStore();

    return (
        <ProfileView
            country={country}
            currency={currency}
            email={email}
            gender={gender}
            name={name}
            timezone={timezone}
            username={username}
            currencies={currencies}
            onUserChange={onUserChange}
            onEditUserClick={editUser}
        />
    );
};

export default observer(ProfileContainer);
