import React from 'react';

import { AuthForm } from './AuthForm';
import { AuthFormViewProps } from './AuthForm/types';
import { FullHeightWrapper } from './styled/Wrappers';

type LoginViewProps = {} & AuthFormViewProps;

const AuthView = ({
    onSubmit,
    registerEmail,
    registerPassword,
    error,
    submitText
}: LoginViewProps) => (
    <FullHeightWrapper>
        <AuthForm
            onSubmit={onSubmit}
            registerEmail={registerEmail}
            registerPassword={registerPassword}
            error={error}
            submitText={submitText}
        />
    </FullHeightWrapper>
);

export default AuthView;
