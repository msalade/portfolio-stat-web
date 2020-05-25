import { observable, action } from 'mobx';

import Transaction from '../dataTypes/transacion';

const transactions: Transaction[] = [
    {
        id: '1',
        comment: '',
        date: new Date(),
        exchange: 'dd',
        type: 'aaa',
        buy: {
            id: '',
            currency: {
                id: '.',
                name: 'sdf',
                symbol: 'sdffs',
                type: 'fiat'
            },
            ammount: 123
        },
        sell: {
            id: '',
            currency: {
                id: '.',
                name: 'sdf',
                symbol: 'sdffs',
                type: 'fiat'
            },
            ammount: 123
        },
        user: {} as any
    },
    {
        id: '2',
        comment: '',
        date: new Date(),
        exchange: 'dd',
        type: 'aaa',
        buy: {
            id: '',
            currency: {
                id: '.',
                name: 'sdf',
                symbol: 'sdffs',
                type: 'fiat'
            },
            ammount: 123
        },
        sell: {
            id: '',
            currency: {
                id: '.',
                name: 'sdf',
                symbol: 'sdffs',
                type: 'fiat'
            },
            ammount: 123
        },
        user: {} as any
    }
];

class TransactionStore {
    @observable
    transactions: Transaction[] = transactions

    @action
    deleteTransaction = (id: string) => {

    }

    @action
    editTransaction = (transaction: Transaction) => {

    }

    @action
    createTransaction = (transaction: Transaction) => {

    }
}

export default TransactionStore;