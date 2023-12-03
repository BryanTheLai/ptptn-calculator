import React from 'react';
import { Area,ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LoanDetailsChart {
    months: number;
    totalAmount: number;
    monthlyPayAmount: number;
}

const LoanDetailsChart: React.FC<LoanDetailsChart> = ({ months, totalAmount, monthlyPayAmount }) => {
    const data = [];
    let remainingAmount = totalAmount;
    let cumulativeMonthlyPayment = 0;
    const monthlyPayment = Math.round(monthlyPayAmount * 100) / 100;

    for (let i = 1; i <= months; i++) {
        cumulativeMonthlyPayment += monthlyPayment;
        remainingAmount -= monthlyPayment;
        cumulativeMonthlyPayment = Math.round(cumulativeMonthlyPayment * 100) / 100;
        remainingAmount = Math.round(remainingAmount * 100) / 100;
        data.push({ month: i, monthlyPayAmount: monthlyPayment, cumulativeMonthlyPayment, leftToPay: remainingAmount });
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="cumulativeMonthlyPayment" name="Cumulative Monthly Payment" stroke="#7B66FF" />
                <Area type="monotone" dataKey="leftToPay" name="Left to Pay" stroke="#5FBDFF" />
                <Line activeDot={{ strokeWidth: 1 }} type="monotone" dataKey="monthlyPayAmount" name="Monthly Payment" stroke="#F05941" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default LoanDetailsChart;