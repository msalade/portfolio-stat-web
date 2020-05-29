import UserStore from './UserStore';
import TransactionStore from './TransactionStore';
import CurrencyStore from './CurrencyStore';
import OperationStore from './OperationStore';
import AnaliticStore from './AnaliticStore';

const createStore = () => {
    const operationStore = new OperationStore();
    const userStore = new UserStore();
    const transactionStore = new TransactionStore(operationStore);
    const currencyStore = new CurrencyStore();
    const analiticStore = new AnaliticStore();

    return {
        operationStore,
        userStore,
        transactionStore,
        currencyStore,
        analiticStore
    };
};

export type TStore = {
    operationStore: OperationStore;
    userStore: UserStore;
    transactionStore: TransactionStore;
    currencyStore: CurrencyStore;
    analiticStore: AnaliticStore;
};

export default createStore();
