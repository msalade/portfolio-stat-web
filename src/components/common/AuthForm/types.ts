export type AuthFormViewProps = {
    onSubmit: (
        e?: React.BaseSyntheticEvent<object, any, any> | undefined
    ) => Promise<void>;
    registerEmail: any;
    registerPassword: any;
    error?: string;
    submitText?: string;
};

export type FormData = {
    email: string;
    password: string;
};
