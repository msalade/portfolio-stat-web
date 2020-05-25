import UserStore from './UserStore';
import TransactionStore from './TransactionStore';
import CurrencyStore from './CurrencyStore';

const store = {
    useStore: new UserStore(),
    transactionStore: new TransactionStore(),
    currencyStore: new CurrencyStore()
};

export type TStore = typeof store;

export default store;
