import UserStore from './UserStore';
import TransactionStore from './TransactionStore';
import CurrencyStore from './CurrencyStore';
import OperationStore from './OperationStore';

const createStore = () => {
    const operationStore = new OperationStore();
    const userStore = new UserStore();
    const transactionStore = new TransactionStore(operationStore);
    const currencyStore = new CurrencyStore();

    return {
        operationStore,
        userStore,
        transactionStore,
        currencyStore
    };
};

export type TStore = {
    operationStore: OperationStore;
    userStore: UserStore;
    transactionStore: TransactionStore;
    currencyStore: CurrencyStore;
};

export default createStore();
