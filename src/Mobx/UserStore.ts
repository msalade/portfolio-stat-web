import { observable, action } from 'mobx';
import axios from 'axios';

import { UserToCreate } from '../dataTypes/user';
import app from '../auth';

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
    getByEmail = (email: string) => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .get(`${basePath}/byEmail/${encodeURIComponent(email)}`, {
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
                        }
                    });
            });
    };
}

export default UserStore;
