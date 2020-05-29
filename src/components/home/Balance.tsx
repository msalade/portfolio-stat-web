import React, { useContext } from 'react';

import {
    BarChart,
    Cell,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

import { ChartData } from './chartDataType';
import { ColorContext } from '../../contexts/ColorContext';

interface IBalanceProps {
    balance: ChartData[];
}

const Balance = ({ balance }: IBalanceProps) => {
    const colors = useContext(ColorContext);

    return (
        <BarChart
            width={600}
            height={400}
            data={balance}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
                {balance.map((item, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={colors && colors[(item as any).name]}
                    />
                ))}
            </Bar>
        </BarChart>
    );
};

export default Balance;
