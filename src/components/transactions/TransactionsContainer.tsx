import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

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
        currencyStore: { currencies },
        userStore: { id }
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
            ? createTransaction({
                  ...transaction,
                  user: id
              })
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
                transactions={toJS(transactions)}
                onCreateClick={createClickHandler}
                onDeleteClick={deleteClickHandler}
                onEditClick={editClickHandler}
            />
            <TransactionForm
                open={showForm}
                type={formType}
                transaction={transaction}
                allCurrencies={toJS(currencies)}
                onTransactionChange={onTransactionChange}
                onCancel={formCancelHandler}
                onSubmit={formSubmitHandler}
            />
        </>
    );
};

export default observer(TransactionsContainer);
