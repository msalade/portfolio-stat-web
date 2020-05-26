import React from 'react';
import 'date-fns';
import { TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import Currency from '../../dataTypes/currency';
import { Wrapper, Row } from './styled';

interface IProfileViewProps {
    country: string;
    currency: Currency;
    email: string;
    gender: string;
    name: string;
    timezone: string;
    username: string;
    currencies: Currency[];
    onUserChange: (data: any, field: string) => void;
    onEditUserClick: () => void;
}

const ProfileView = ({
    country,
    currency,
    email,
    gender,
    name,
    timezone,
    username,
    currencies,
    onUserChange,
    onEditUserClick
}: IProfileViewProps) => (
    <Wrapper>
        <Row>
            <TextField
                label="Name"
                variant="outlined"
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onUserChange(event.target.value, 'name');
                }}
                value={name}
            />
            <TextField
                label="Username"
                variant="outlined"
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onUserChange(event.target.value, 'username');
                }}
                value={username}
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onUserChange(event.target.value, 'email');
                }}
                value={email}
            />
        </Row>
        <Row>
            <TextField
                label="Country"
                variant="outlined"
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onUserChange(event.target.value, 'country');
                }}
                value={country}
            />
            <TextField
                label="Gender"
                variant="outlined"
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onUserChange(event.target.value, 'gender');
                }}
                value={gender}
            />
            <TextField
                label="Timezone"
                variant="outlined"
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onUserChange(event.target.value, 'timezone');
                }}
                value={timezone}
            />
        </Row>
        <Row>
            <Autocomplete
                options={currencies}
                getOptionLabel={(curr: Currency) => curr.name}
                style={{ width: 200 }}
                value={currency}
                onChange={(event: any, crc: any) => {
                    onUserChange(crc, 'currency');
                }}
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        label="Currency"
                        variant="outlined"
                    />
                )}
                getOptionSelected={(option: Currency, value: Currency) =>
                    !option || option.id === value.id
                }
            />
        </Row>
        <Row>
            <Button variant="contained" color="primary" onClick={onEditUserClick}>
                Edit
            </Button>
        </Row>
    </Wrapper>
);

export default ProfileView;
