import { observable, action, toJS } from 'mobx';
import axios from 'axios';

import Transaction from '../dataTypes/transacion';
import app from '../auth';
import OperationStore from './OperationStore';

const basePath = `${process.env.REACT_APP_PORTFOLIO_API_URL}/transaction`;

class TransactionStore {
    @observable
    transactions: Transaction[] = [];

    operationStore: OperationStore = {} as OperationStore;

    constructor(operationStore: OperationStore) {
        this.operationStore = operationStore;
    }

    @action
    deleteTransaction = async (id: string) => {
        return app
            .auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .delete(`${basePath}/${id}`, {
                        headers: {
                            AuthToken: token
                        }
                    })
                    .then(() => {
                        this.transactions = toJS(this.transactions).filter(
                            transaction => transaction.id !== id
                        );
                    });
            });
    };

    @action
    editTransaction = (transaction: Transaction) => {
        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .post(
                        `${basePath}`,
                        {
                            ...transaction,
                            user: (transaction.user as any).id,
                            buy: transaction.buy.id,
                            sell: transaction.sell.id
                        },
                        {
                            headers: {
                                AuthToken: token
                            }
                        }
                    )
                    .then(() => {
                        const jsTransactions = toJS(this.transactions);
                        const index = jsTransactions.findIndex(
                            trs => trs.id === transaction.id
                        );

                        jsTransactions[index] = transaction;

                        this.transactions = jsTransactions;
                    });
            });
    };

    @action
    createTransaction = async (transaction: Transaction) => {
        const buyId = await this.operationStore.createOperation(
            transaction.buy
        );
        const sellId = await this.operationStore.createOperation(
            transaction.sell
        );

        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .put(
                        `${basePath}`,
                        {
                            comment: transaction.comment,
                            date: transaction.date,
                            exchange: transaction.exchange,
                            type: transaction.type,
                            user: transaction.user,
                            buy: buyId,
                            sell: sellId
                        },
                        {
                            headers: {
                                AuthToken: token
                            }
                        }
                    )
                    .then(({ data }) => {
                        this.transactions = [
                            {
                                id: data.id,
                                ...transaction
                            },
                            ...toJS(this.transactions)
                        ];
                    });
            });
    };

    @action
    getMyTransactions = () => {
        const path = `${basePath}/all/me`;

        app.auth()
            .currentUser?.getIdToken(true)
            .then(token => {
                axios
                    .get(path, {
                        headers: {
                            AuthToken: token
                        }
                    })
                    .then(({ data }) => {
                        this.transactions = data.map((trs: any) => ({
                            ...trs,
                            date: new Date(trs.date)
                        }));
                    });
            });
    };
}

export default TransactionStore;
