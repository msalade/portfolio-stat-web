import { observable, action } from 'mobx';
import axios from 'axios';

import app from '../auth';

const basePath = `${process.env.REACT_APP_PORTFOLIO_API_URL}/analitic`;

export interface TradeByMonth {
    date: string;
    number: number;
}

export interface CurrenciesState {
    [key: string]: {
        byCurr: number;
        change: number;
        raw: number;
    };
}

class AnaliticStore {
    @observable
    firstTrade: Date | undefined = undefined;

    @observable
    lastTrade: Date | undefined = undefined;

    @observable
    totalValue: number = 0;

    @observable
    tradeByMonth: TradeByMonth[] = [];

    @observable
    currenciesState: CurrenciesState = {};

    @action
    getFirstTrade = () => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .get(`${basePath}/me/firstTrade`, {
                        headers: {
                            AuthToken: token
                        }
                    })
                    .then(({ data }) => {
                        this.firstTrade = !!data.date
                            ? new Date(data.date)
                            : undefined;
                    });
            });
    };

    @action
    getLastTrade = () => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .get(`${basePath}/me/lastTrade`, {
                        headers: {
                            AuthToken: token
                        }
                    })
                    .then(({ data }) => {
                        this.lastTrade = !!data.date
                            ? new Date(data.date)
                            : undefined;
                    });
            });
    };

    @action
    getCurrenciesStat = (currency: string) => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .get(`${basePath}/me/currencies/${currency}`, {
                        headers: {
                            AuthToken: token
                        }
                    })
                    .then(({ data }) => {
                        this.currenciesState = data;
                      
                        for (let symbol in data) {
                            this.totalValue += data[symbol].byCurr;
                        }
                    });
            });
    };

    @action
    getTradesByMonth = () => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .get(`${basePath}/me/tradesByMont`, {
                        headers: {
                            AuthToken: token
                        }
                    })
                    .then(({ data }) => {
                        this.tradeByMonth = data;
                    });
            });
    };
}

export default AnaliticStore;
