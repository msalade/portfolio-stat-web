import { observable } from 'mobx';
import Currency from '../dataTypes/currency';

const currencies: Currency[] = [
    {
        id: '.',
        name: 'Złoty',
        symbol: 'PLN',
        type: 'fiat'
    },
    {
        id: '.',
        name: 'sd',
        symbol: 'sd',
        type: 'fiat'
    },
    {
        id: '.',
        name: 'sdf',
        symbol: 'sdf',
        type: 'fiat'
    },
    {
        id: '.',
        name: 'sdf',
        symbol: 'sdffs',
        type: 'fiat'
    }
];


class CurrencyStore {
    @observable
    currencies: Currency[] = currencies;
}

export default CurrencyStore;