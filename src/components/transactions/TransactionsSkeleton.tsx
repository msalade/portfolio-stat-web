import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { List, ListItem } from '@material-ui/core';

import { Wrapper, ButtonsWrapper } from './styled';

const TransactionsSkeleton = () => (
    <Wrapper>
        <ButtonsWrapper>
            <Skeleton variant="rect" width={90} height={48} />
            <Skeleton variant="circle" width={48} height={48} />
        </ButtonsWrapper>
        <List>
            <ListItem>
                <Skeleton variant="rect" width={800} height={72} />
            </ListItem>
            <ListItem>
                <Skeleton variant="rect" width={800} height={72} />
            </ListItem>
            <ListItem>
                <Skeleton variant="rect" width={800} height={72} />
            </ListItem>
        </List>
    </Wrapper>
);

export default TransactionsSkeleton;
