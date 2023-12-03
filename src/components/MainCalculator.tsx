import { ChangeEvent, useEffect, useState } from "react";
import LoanDetailsList from "./LoanDetailsList";
import LoanDetailsChart from "./LoanDetailsChart";

function MainCalculator() {
  const [lendAmount, setLendAmount] = useState(1);
  const [lendInterest, setLendInterest] = useState(1);
  const [months, setMonths] = useState(1);

  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyPayAmount, setMonthlyPayAmount] = useState(0);

  useEffect(() => {
    console.log("<- Use Effect ->");
    console.log("Lend Amount:", lendAmount);
    console.log("Lend Interest:", lendInterest);
    console.log("Months:", months);
    // Monthly Payment Formula Cross Referenced with : https://www.ptptn.gov.my/loancalc/loancalc-ujrah/#!
    const ptptn = Math.ceil((lendAmount + (lendAmount * lendInterest/100 * (months / 12))) / (months/12*12)*100)/100;

    const finalTotalPayment = Math.round(ptptn*months*100)/100;
    setMonthlyPayAmount(ptptn); // Monthly Amount to Pay
    setTotalAmount(finalTotalPayment); //Total Loan Amount to Pay
  }, [lendAmount, lendInterest, months]);

  const handleTotalAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "lendAmount") {
      setLendAmount(Number(value));
    }
    if (name === "lendInterest") {
      setLendInterest(Number(value));
    }
    if (name === "months") {
      setMonths(Number(value));
    }
  };

  return (
    <>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Education Loan Calculator</h1>
        <h2 className="text-2xl mb-4">PTPTN Calculator (https://www.ptptn.gov.my/loancalc/loancalc-ujrah/#!)</h2>

        <form className="mb-8">
          {/* Lend Amount */}
          <div className="mb-4">
            <label className="block mb-2">Amount to Lend (RM)</label>
            <input
              name="lendAmount"
              type="number"
              value={lendAmount}
              onChange={handleTotalAmountChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-4">
            <label className="block mb-2">
              Interest Compounded Annually (%)
            </label>
            <div className="flex">
              <input
                name="lendInterest"
                type="number"
                value={lendInterest}
                onChange={handleTotalAmountChange}
                min={0}
                max={100}
                defaultValue={1}
                className="w-full p-2 border border-gray-300 rounded rounded-r-none"
              />
              <span className="p-2 bg-gray-700 border border-l-0 border-gray-300 rounded rounded-l-none">
                %
              </span>
            </div>
          </div>

          {/* Months */}
          <div className="mb-4">
            <label className="block mb-2">
              Months to Payback Loan ({Math.floor(months / 12)} Years,{" "}
              {months % 12} Months)
            </label>
            <input
              name="months"
              type="number"
              value={months}
              onChange={handleTotalAmountChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </form>

        <h2 className="text-left text-lg font-bold">
        RM {(Math.round(lendAmount / months *100)/100)} - Principal Payment / Month
        </h2>
        <h2 className="text-left text-lg font-bold border-b">
        RM {(monthlyPayAmount - lendAmount / months).toFixed(2)} -
          Interest Payment / Month
        </h2>
        <h2 className="text-left text-lg font-bold">
          RM {monthlyPayAmount.toFixed(2)} - Total Repayment Payment / Month
          Amount
        </h2>
        <h2 className="text-left text-lg font-bold">
          RM {(totalAmount-lendAmount).toFixed(2)} - Payment Amount without Interest
        </h2>
        <h2 className="text-left text-lg font-bold">
          RM {totalAmount.toFixed(2)} - Total Payment Amount with Interest
        </h2>
        <LoanDetailsChart totalAmount={totalAmount} monthlyPayAmount={monthlyPayAmount} months={months}/>

        <LoanDetailsList totalAmount={totalAmount} monthlyPayAmount={monthlyPayAmount} months={months}/>

      </div>
      
    </>
  );
}


export default MainCalculator;

/*
p-8: sets padding to 8 units
text-2xl: sets font size to 2xl
font-bold: sets font weight to bold
mb-4: sets margin bottom to 4 units
mb-8: sets margin bottom to 8 units
block: sets display to block
w-full: sets width to full
border: sets border
border-gray-300: sets border color to gray-300
rounded: sets border radius to default value
rounded-r-none: sets border radius to none on the right side
bg-gray-700: sets background color to gray-700
border-l-0: sets left border to 0
*/
