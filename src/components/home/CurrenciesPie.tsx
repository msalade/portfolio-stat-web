import React, { useContext } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

import { ChartData } from './chartDataType';
import { ColorContext } from '../../contexts/ColorContext';

export interface ICurrenciesPieProps {
    data: ChartData[];
}

const CurrenciesPie = ({ data }: ICurrenciesPieProps) => {
    const colors= useContext(ColorContext);

    return (
        <PieChart width={250} height={250}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                outerRadius={60}
                label={data => data.name}
            >
                {data.map((item, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={colors && colors[(item as any).name]}
                    />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default CurrenciesPie;
