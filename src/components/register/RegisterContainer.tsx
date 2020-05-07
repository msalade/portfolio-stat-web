import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

import AuthView from '../common/AuthView';
import { FormData } from '../common/AuthForm/types';
import app from '../../auth';

const RegisterContainer = () => {
    const [error, setError] = useState<string>('');
    const { push } = useHistory();
    const { handleSubmit, register } = useForm<FormData>();
    const submitHandler = handleSubmit(async ({ email, password }) => {
        try {
            await app.auth().createUserWithEmailAndPassword(email, password);

            push('/');
        } catch (error) {
            setError(error.message);
        }
    });

    const registerEmail = register({
        required: 'Required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'invalid email address'
        }
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
            submitText="Register"
        />
    );
};

export default RegisterContainer;
