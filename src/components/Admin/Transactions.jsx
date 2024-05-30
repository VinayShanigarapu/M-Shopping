import React, { useState, useContext } from "react";
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import '../css/admin.css'
import { ShopContext } from "../../Context/ShopContext";

function Transactions() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const { getTransactionsSummary, filterTransactionsByDate } = useContext(ShopContext);

  const filteredTransactions = selectedDate ? filterTransactionsByDate(selectedDate) : null;
  const transactionsSummary = selectedDate ? getTransactionsSummary(selectedDate) : null;

  console.log("Selected Date:", selectedDate); // Debugging output
  console.log("Transactions Summary:", transactionsSummary); // Debugging output

  const handleDatePick = async () => {
    const { value: date } = await Swal.fire({
      title: "Select date",
      input: "date",
      didOpen: () => {
        const today = new Date().toISOString().split("T")[0];
        Swal.getInput().max = today;
      }
    });

    if (date) {
      setSelectedDate(date);
    }
  };

  // Check if there is any data
  const hasData = transactionsSummary && (
    transactionsSummary.transactionsByTime.length > 0 ||
    (filteredTransactions && filteredTransactions.length > 0)
  );

   if (selectedDate && !hasData) {
    Swal.fire({
      title: 'No Data ',
      text: `There are no Sales and Transaction data  available for the selected date: ${selectedDate}`,
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  return (
    <>
      <center>
        <h1 className='text-center'>Select A Date</h1>
        <button className="view1" onClick={handleDatePick}>Select Date</button>
      </center>

      {selectedDate && hasData && (
        <>
          <div className="box-container">
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">{transactionsSummary.grandTotalSales} Rs</h2>
                <h2 className="topic">Amount Earned</h2>
              </div>
            </div>

            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">{transactionsSummary.grandTotalProducts} Items</h2>
                <h2 className="topic"> Total Sales</h2>
              </div>
            </div>
          </div>

          {/* Conditional rendering for transactions report */}
          {transactionsSummary.transactionsByTime.length > 0 && (
            <div className="report-container">
              <div className="report-header">
                <h1 className="recent-Articles">Transactions on {selectedDate}</h1>
                <button className="view" onClick={() => setSelectedDate(null)}>Reload</button>
              </div>

              <div className="report-body">
                <div className="report-topic-heading">
                  <h3 className="t-op"> Sl.Number</h3>
                  <h3 className="t-op">Time</h3>
                  <h3 className="t-op">NetQuantity</h3>
                  <h3 className="t-op">Mode</h3>
                  <h3 className="t-op">Amount</h3>
                </div>

                {/* Rendering transactions summary */}
                {transactionsSummary.transactionsByTime.map((transactionGroup, index) => (
                  <div className="item1" key={index}>
                    <h3 className="t-op-nextlvl">{index + 1}</h3>
                    <h3 className="t-op-nextlvl">{transactionGroup.time}</h3>
                    <h3 className="t-op-nextlvl">{transactionGroup.totalQuantity}</h3>
                    <h3 className="t-op-nextlvl">{transactionGroup.mode}</h3>
                    <h3 className="t-op-nextlvl">{transactionGroup.totalPrice}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conditional rendering for sales report */}
          {filteredTransactions && filteredTransactions.length > 0 && (
            <div className="report-container">
              <div className="report-header">
                <h1 className="recent-Articles">Sales on {selectedDate}</h1>
                <button className="view" onClick={() => setSelectedDate(null)}>Reload</button>
              </div>

              <div className="report-body">
                <div className="report-topic-heading">
                  <h3 className="t-op">Name</h3>
                  <h3 className="t-op">Category</h3>
                  <h3 className="t-op">Sub-category</h3>
                  <h3 className="t-op">Size</h3>
                  <h3 className="t-op">Total Quantity</h3>
                </div>

                {/* Rendering filtered transactions */}
                {filteredTransactions.map((transactionGroup, index) => (
                  <div className="item1" key={index}>
                    <h3 className="t-op-nextlvl">{transactionGroup.name}</h3>
                    <h3 className="t-op-nextlvl">{transactionGroup.category}</h3>
                    <h3 className="t-op-nextlvl">{transactionGroup.subcategory}</h3>
                    <h3 className="t-op-nextlvl">{transactionGroup.size}</h3>
                    <h3 className="t-op-nextlvl">{transactionGroup.totalQuantity}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Transactions;