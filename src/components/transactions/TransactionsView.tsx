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
import { Delete, Payment, Edit, PictureAsPdf } from '@material-ui/icons';
import { format } from 'date-fns';

import { Wrapper, ButtonsWrapper } from './styled';
import Transaction from '../../dataTypes/transacion';

interface ITransactionsViewProps {
    transactions: Transaction[];
    onCreateClick: () => void;
    onDeleteClick: (id: string) => void;
    onEditClick: (transaction: Transaction) => void;
    onPrintClick: () => void;
}

const TransactionsView = ({
    transactions,
    onCreateClick,
    onDeleteClick,
    onEditClick,
    onPrintClick
}: ITransactionsViewProps) => (
    <Wrapper>
        <ButtonsWrapper>
            <Button variant="contained" onClick={onCreateClick}>
                Create
            </Button>
            <IconButton onClick={onPrintClick}>
                <PictureAsPdf />
            </IconButton>
        </ButtonsWrapper>
        <List id="transactions">
            {(transactions || []).map(transaction => (
                <ListItem key={transaction.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <Payment />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        style={{ width: '247px' }}
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
