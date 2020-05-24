import Currency from './currency';

interface Operation {
    id: string;
    ammount: number;
    currency: Currency;
}

export default Operation;