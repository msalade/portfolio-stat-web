import Currency from './currency';

interface BaseUser {
    country: string;
    email: string;
    gender: string;
    name: string;
    timezone: string;
    username: string;
}

interface User extends BaseUser {
    id: string;
    currency: Currency;
}

export interface UserToCreate extends BaseUser {
    currency?: string;
}

export default User;