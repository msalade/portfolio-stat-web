import React, { useState } from 'react';
import { observer } from 'mobx-react';

import TransactionsView from './TransactionsView';
import Transaction, { DefaultTransaction } from '../../dataTypes/transacion';
import TransactionForm from './TransactionForm';
import useStore from '../../hooks/useStore';

const TransactionsContainer = () => {
    const {
        transactionStore: {
            transactions,
            createTransaction,
            editTransaction,
            deleteTransaction
        },
        currencyStore: {
            currencies
        }
    } = useStore();
    const [formType, setFormType] = useState<'edit' | 'create'>('create');
    const [showForm, setShowForm] = useState<boolean>(false);
    const [transaction, setTransaction] = useState<Transaction>(
        DefaultTransaction
    );

    const onTransactionChange = (value: any, field: string) => {
        setTransaction(trs => {
            const newTrs: any = { ...trs };

            newTrs[field] = value;
            console.log(newTrs);
            return newTrs;
        });
    };

    const formCancelHandler = () => {
        setShowForm(false);
        setTransaction(DefaultTransaction);
    };

    const formSubmitHandler = () => {
        setShowForm(false);

        formType === 'create'
            ? createTransaction(transaction)
            : editTransaction(transaction);
    };

    const createClickHandler = () => {
        setTransaction(DefaultTransaction);
        setFormType('create');
        setShowForm(true);
    };

    const deleteClickHandler = (id: string) => {
        deleteTransaction(id);
    };

    const editClickHandler = (transaction: Transaction) => {
        setTransaction(transaction);
        setFormType('edit');
        setShowForm(true);
    };

    return (
        <>
            <TransactionsView
                transactions={transactions}
                onCreateClick={createClickHandler}
                onDeleteClick={deleteClickHandler}
                onEditClick={editClickHandler}
            />
            <TransactionForm
                open={showForm}
                type={formType}
                transaction={transaction}
                allCurrencies={currencies}
                onTransactionChange={onTransactionChange}
                onCancel={formCancelHandler}
                onSubmit={formSubmitHandler}
            />
        </>
    );
};

export default observer(TransactionsContainer);
