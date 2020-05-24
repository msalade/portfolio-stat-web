import Operation from './operation';
import User from './user';

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

export default Transaction;