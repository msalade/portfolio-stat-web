import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

import { FormData } from '../common/AuthForm/types';
import app from '../../auth';
import AuthView from '../common/AuthView';
import useStore from '../../hooks/useStore';

const LoginContainer = () => {
    const [error, setError] = useState<string>('');
    const { push } = useHistory();
    const { handleSubmit, register } = useForm<FormData>();
    const {
        userStore: { getByEmail }
    } = useStore();

    const submitHandler = handleSubmit(async ({ email, password }) => {
        try {
            await app.auth().signInWithEmailAndPassword(email, password);
            await getByEmail(email);

            push('/');
        } catch (error) {
            setError(error.message);
        }
    });

    const registerEmail = register({
        required: 'Required'
    });

    const registerPassword = register({
        required: 'Required'
    });

    return (
        <AuthView
            onSubmit={submitHandler}
            registerEmail={registerEmail}
            registerPassword={registerPassword}
            error={error}
            submitText="Login"
        />
    );
};

export default LoginContainer;
