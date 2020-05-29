import React from 'react';
import { Typography } from '@material-ui/core';

import { BalanceWrapper } from './styled';

export interface ICurrValue {
    symbol: string;
    byCurr: number;
    change: number;
    raw: number;
}

interface IBalanceProps {
    currValue: ICurrValue[];
    curSymbol: string;
}

const CurrValue = ({ currValue, curSymbol }: IBalanceProps) => (
    <BalanceWrapper>
        <Typography variant="h6">Currency</Typography>
        <Typography variant="h6">Ammount</Typography>
        <Typography variant="h6">Value in {curSymbol}</Typography>
        <Typography variant="h6">Trend 24h</Typography>
        {currValue?.map(({ symbol, raw, byCurr, change }) => (
            <>
                <Typography variant="subtitle1">{symbol}</Typography>
                <Typography variant="subtitle1">{Math.round(raw)}</Typography>
                <Typography variant="subtitle1">
                    {Math.round(byCurr)}
                </Typography>
                <Typography variant="subtitle1">
                    {Math.round(change)} %
                </Typography>
            </>
        ))}
    </BalanceWrapper>
);

export default CurrValue;
