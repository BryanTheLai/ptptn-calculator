import React from "react";

interface LoanDetailsList {
  totalAmount: number;
  monthlyPayAmount: number;
  months: number;
}

const listDetails = (
  initialMonthlyPayAmount: number,
  totalAmount: number,
  months: number
): JSX.Element[] => {
  let result = [];
  let cumulativeMonthlyPayment = 0;
  let remainingAmount = totalAmount;
  let monthlyPayAmount = Math.floor(initialMonthlyPayAmount * 100) / 100;

  for (let i = 1; i <= months; i++) {
    cumulativeMonthlyPayment += monthlyPayAmount;
    remainingAmount -= monthlyPayAmount;

    result.push(
      <tr key={i} className="border">
        <td className="border p-1">{i}</td>
        <td className="border p-1">{monthlyPayAmount.toFixed(2)}</td>
        <td className="border p-1">{cumulativeMonthlyPayment.toFixed(2)}</td>
        <td className="border p-1">{remainingAmount.toFixed(2)}</td>
      </tr>
    );
  }
  return result;
};


const LoanDetailsList: React.FC<LoanDetailsList> = ({
  totalAmount,
  monthlyPayAmount,
  months = 1,
}) => {
  return (
    <div className="">
      <table className="table-auto w-full">
        <thead>
          <tr className="border">
            <th className="border px-1 py-2">Month</th>
            <th className="border px-1 py-2">Payment / Month (RM)</th>
            <th className="border px-1 py-2">Cumulative Monthly Payment (RM)</th>
            <th className="border px-1 py-2">Left to Pay (RM)</th>
          </tr>
        </thead>
        <tbody>{listDetails(monthlyPayAmount, totalAmount, months)} </tbody>
      </table>
    </div>
  );
};

export default LoanDetailsList;
