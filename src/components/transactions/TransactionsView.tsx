import React from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import { Delete, Payment, Edit } from '@material-ui/icons';
import { format } from 'date-fns';

import { Wrapper } from './styled';
import Transaction from '../../dataTypes/transacion';

interface ITransactionsViewProps {
    transactions: Transaction[];
    onCreateClick: () => void;
    onDeleteClick: (id: string) => void;
    onEditClick: (transaction: Transaction) => void;
}

const TransactionsView = ({
    transactions,
    onCreateClick,
    onDeleteClick,
    onEditClick
}: ITransactionsViewProps) => (
    <Wrapper>
        <Button variant="contained" onClick={onCreateClick}>
            Create
        </Button>
        <List>
            {(transactions || []).map(transaction => (
                <ListItem key={transaction.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <Payment />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`Buy: ${transaction.buy.ammount} ${transaction.buy.currency.symbol}`}
                        secondary={`Comment: ${transaction.comment || '-'}`}
                    />
                    <ListItemText
                        primary={`Sell: ${transaction.sell.ammount} ${transaction.sell.currency.symbol}`}
                        secondary={`Exchange: ${transaction.exchange || '-'}`}
                    />
                    <ListItemText
                        primary={format(transaction.date, 'MM/dd/yyyy')}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => onDeleteClick(transaction.id)}
                        >
                            <Delete />
                        </IconButton>
                        <IconButton
                            aria-label="edit"
                            onClick={() => onEditClick(transaction)}
                        >
                            <Edit />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </Wrapper>
);

export default TransactionsView;
