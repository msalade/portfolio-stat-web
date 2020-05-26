import { observable, action } from 'mobx';
import axios from 'axios';

import Currency from '../dataTypes/currency';
import app from '../auth';

const basePath = `${process.env.REACT_APP_PORTFOLIO_API_URL}/currency`;

class CurrencyStore {
    @observable
    currencies: Currency[] = [];

    @action
    getAll = () => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .get(`${basePath}/all`, {
                        headers: {
                            AuthToken: token
                        }
                    })
                    .then(({ data }) => {
                        this.currencies = data;
                    });
            });
    };
}

export default CurrencyStore;
