import Operation from './operation';
import User from './user';
import Currency from './currency';

interface Transaction {
    id: string;
    comment: string;
    date: Date;
    exchange: string;
    type: string;
    buy: Operation;
    sell: Operation;
    user: User;
}

export const DefaultTransaction: Transaction = {
    id: '',
    comment: '',
    date: new Date(),
    exchange: '',
    type: '',
    buy: {
        id: '',
        currency: {} as Currency,
        ammount: 0
    },
    sell: {
        id: '',
        currency: {} as Currency,
        ammount: 0
    },
    user: {} as User
}

export default Transaction;