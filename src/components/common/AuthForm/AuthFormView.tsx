import React from 'react';

import { AuthFormViewProps } from './types';
import { Wrapper, Error } from './styled';
import { TextField, Button } from '@material-ui/core';

const AuthFormView = ({
    onSubmit,
    registerEmail,
    registerPassword,
    error,
    submitText,
}: AuthFormViewProps) => (
    <Wrapper onSubmit={onSubmit}>
        <TextField
            type="email"
            name="email"
            label="Email"
            inputProps={{
                ref: registerEmail,
            }}
        />
        <TextField
            type="password"
            name="password"
            label="Password"
            inputProps={{
                ref: registerPassword,
            }}
        />
        {!!error && <Error>{error}</Error>}
        <Button color="primary" type="submit" variant="contained">
            {submitText || 'Submit'}
        </Button>
    </Wrapper>
);

export default AuthFormView;
