import React from 'react';
import 'date-fns';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { InputsWrapper } from './styled';
import Transaction from '../../dataTypes/transacion';
import Currency from '../../dataTypes/currency';

interface IDialogFormProps {
    type: 'edit' | 'create';
    open?: boolean;
    transaction: Transaction;
    allCurrencies: Currency[];
    onTransactionChange: (value: any, field: string) => void;
    onCancel: () => void;
    onSubmit: () => void;
}

const TransactionForm = ({
    type,
    open,
    transaction,
    allCurrencies,
    onTransactionChange,
    onCancel,
    onSubmit
}: IDialogFormProps) => (
    <Dialog open={!!open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            {type === 'edit' ? 'Edit' : 'Create'} transaction
        </DialogTitle>
        <DialogContent>
            <InputsWrapper>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Transaction Date:"
                        value={transaction.date}
                        onChange={(date: any) => {
                            onTransactionChange(date, 'date');
                        }}
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    label="Type"
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onTransactionChange(event.target.value, 'type');
                    }}
                    value={transaction.type}
                />
            </InputsWrapper>
            <InputsWrapper>
                <TextField
                    label="Buy"
                    variant="outlined"
                    type="number"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onTransactionChange(
                            {
                                ...transaction.buy,
                                ammount: event.target.value
                            },
                            'buy'
                        );
                    }}
                    value={transaction.buy.ammount}
                />
                <Autocomplete
                    options={allCurrencies}
                    getOptionLabel={(curr: Currency) => curr.name}
                    style={{ width: 200 }}
                    value={transaction.sell.currency}
                    onChange={(event: any, currency: any) => {
                        onTransactionChange(
                            {
                                ...transaction.buy,
                                currency
                            },
                            'buy'
                        );
                    }}
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            label="Currency"
                            variant="outlined"
                        />
                    )}
                />
            </InputsWrapper>
            <InputsWrapper>
                <TextField
                    label="Sell"
                    variant="outlined"
                    type="number"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onTransactionChange(
                            {
                                ...transaction.sell,
                                ammount: event.target.value
                            },
                            'sell'
                        );
                    }}
                    value={transaction.sell.ammount}
                />
                <Autocomplete
                    options={allCurrencies}
                    getOptionLabel={(curr: Currency) => curr.name}
                    style={{ width: 200 }}
                    value={transaction.sell.currency}
                    onChange={(event: any, currency: any) => {
                        onTransactionChange(
                            {
                                ...transaction.sell,
                                currency
                            },
                            'sell'
                        );
                    }}
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            label="Currency"
                            variant="outlined"
                        />
                    )}
                />
            </InputsWrapper>
            <InputsWrapper>
                <TextField
                    label="Exchange"
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onTransactionChange(event.target.value, 'exchange');
                    }}
                    value={transaction.exchange}
                />
                <TextField
                    label="Comment"
                    multiline
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onTransactionChange(event.target.value, 'comment');
                    }}
                    value={transaction.comment}
                />
            </InputsWrapper>
        </DialogContent>
        <DialogActions>
            <Button color="secondary" onClick={onCancel}>
                Cancel
            </Button>
            <Button color="primary" onClick={onSubmit}>
                {type === 'edit' ? 'Edit' : 'Create'}
            </Button>
        </DialogActions>
    </Dialog>
);

export default TransactionForm;
