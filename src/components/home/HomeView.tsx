import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';

import { Wrapper, Grid } from './styled';
import CurrenciesPie from './CurrenciesPie';
import CurrValue, { ICurrValue } from './CurrValue';
import { ChartData } from './chartDataType';
import Balance from './Balance';
import TradePerMonth from './TradePerMonth';

interface IHomeViewProps {
    totalValue: string;
    firstTrade: string;
    lastTrade: string;
    totalTrades: number;
    curByValue: ChartData[];
    currency: string;
    currValue: ICurrValue[];
    balance: ChartData[];
    tradesPerMonth: ChartData[];
    onPrintClick: () => void;
    withBorder: boolean;
}

const HomeView = ({
    totalValue,
    firstTrade,
    lastTrade,
    totalTrades,
    curByValue,
    currency,
    currValue,
    balance,
    tradesPerMonth,
    onPrintClick,
    withBorder
}: IHomeViewProps) => (
    <Wrapper>
        <IconButton onClick={onPrintClick}>
            <PictureAsPdf />
        </IconButton>
        <Grid id="dashboard" withBorder={withBorder}>
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
                        Value each currency in {currency}
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
                        Trades per month
                    </Typography>
                    <TradePerMonth data={tradesPerMonth} />
                </CardContent>
            </Card>
        </Grid>
    </Wrapper>
);

export default HomeView;
