import { observable, action } from 'mobx';
import axios from 'axios';

import { UserToCreate } from '../dataTypes/user';
import app from '../auth';
import Currency from '../dataTypes/currency';

const basePath = `${process.env.REACT_APP_PORTFOLIO_API_URL}/user`;

class UserStore {
    @observable
    id = '';

    @observable
    email = '';

    @observable
    country = '';

    @observable
    gender = '';

    @observable
    name = '';

    @observable
    username = '';

    @observable
    timezone = '';

    @observable
    currency: Currency = {} as Currency;

    @action
    onUserChange = (data: any, field: string) => {
        (this as any)[field] = data;
    };

    @action
    createUser = (user: UserToCreate) => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios.put(basePath, user, {
                    headers: {
                        AuthToken: token
                    }
                });
            });
    };

    @action
    getUser = () => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .get(`${basePath}/me`, {
                        headers: {
                            AuthToken: token
                        }
                    })
                    .then(({ data }) => {
                        const user = data && data[0];

                        if (user) {
                            this.id = user.id;
                            this.email = user.email;
                            this.country = user.country;
                            this.gender = user.gender;
                            this.timezone = user.timezone;
                            this.username = user.username;
                            this.currency = user.currency;
                            this.name = user.name;
                        }
                    });
            });
    };

    @action
    editUser = () => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios.post(
                    `${basePath}`,
                    {
                        id: this.id,
                        email: this.email,
                        country: this.country,
                        gender: this.gender,
                        timezone: this.timezone,
                        username: this.username,
                        currency: this.currency.id,
                        name: this.name
                    },
                    {
                        headers: {
                            AuthToken: token
                        }
                    }
                );
            });
    };
}

export default UserStore;
