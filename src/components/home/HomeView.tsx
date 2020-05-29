import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { Wrapper } from './styled';
import CurrenciesPie from './CurrenciesPie';
import CurrValue, { ICurrValue } from './CurrValue';
import { ChartData } from './chartDataType';
import Balance from './Balance';

interface IHomeViewProps {
    totalValue: string;
    firstTrade: string;
    lastTrade: string;
    totalTrades: number;
    curByValue: ChartData[];
    currency: string;
    currValue: ICurrValue[];
    balance: ChartData[];
}

const HomeView = ({
    totalValue,
    firstTrade,
    lastTrade,
    totalTrades,
    curByValue,
    currency,
    currValue,
    balance
}: IHomeViewProps) => (
    <Wrapper>
        <Card style={{ gridArea: 'totalv' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Total value
                </Typography>
                <Typography variant="h5" component="h2">
                    {totalValue}
                </Typography>
            </CardContent>
        </Card>
        <Card style={{ gridArea: 'ft' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    First trade
                </Typography>
                <Typography variant="h5" component="h2">
                    {firstTrade}
                </Typography>
            </CardContent>
        </Card>
        <Card style={{ gridArea: 'lt' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Last trade
                </Typography>
                <Typography variant="h5" component="h2">
                    {lastTrade}
                </Typography>
            </CardContent>
        </Card>
        <Card style={{ gridArea: 'totalt' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Total trades
                </Typography>
                <Typography variant="h5" component="h2">
                    {totalTrades}
                </Typography>
            </CardContent>
        </Card>
        <Card style={{ gridArea: 'circle' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Value each Currency in {currency}
                </Typography>
                <CurrenciesPie data={curByValue} />
            </CardContent>
        </Card>
        <Card style={{ gridArea: 'table' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Current balance
                </Typography>
                <CurrValue currValue={currValue} curSymbol={currency} />
            </CardContent>
        </Card>
        <Card style={{ gridArea: 'balance' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Balance by currency {currency}
                </Typography>
                <Balance balance={balance} />
            </CardContent>
        </Card>
        <Card style={{ gridArea: 'permonth' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Trades per Month
                </Typography>
            </CardContent>
        </Card>
    </Wrapper>
);

export default HomeView;
