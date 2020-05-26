import { action } from 'mobx';
import axios from 'axios';

import app from '../auth';
import Operation from '../dataTypes/operation';

const basePath = `${process.env.REACT_APP_PORTFOLIO_API_URL}/operation`;

class OperationStore {
    @action
    createOperation = async (operation: Operation) => {
        const token = await app.auth().currentUser?.getIdToken(true);

        return axios
            .put(
                `${basePath}`,
                {
                    ammount: Number(operation.ammount),
                    currency: operation.currency.id
                },
                {
                    headers: {
                        AuthToken: token
                    }
                }
            )
            .then(({ data }) => data.id);
    };
}

export type TOperationStore = typeof OperationStore;

export default OperationStore;
