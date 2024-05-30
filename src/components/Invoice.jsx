import React, { useEffect, useState } from 'react';
import Logo from './Assets/logo.png';
import './css/Invoice.css';

const Invoice = React.forwardRef(({ invoiceData, totalAmount, Mode }, ref) => {
    const { items } = invoiceData;
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDateTime = currentDateTime.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });

    return (
        <div className="invoice" ref={ref}>
            <div className="head">
                <img src={Logo} alt="Logo" />
                <div className="bill">
                    <h1>Invoice/Bill of Supply/Cash Memo</h1>
                    <span>(Original for Recipient)</span>
                </div>
            </div>
            <div className="dateAndTime">
                <p>Date : {formattedDateTime}</p>
                <p>Reason : Invoice</p>
            </div>
            <div className="mode">
                <p className='mode-category'><span>Mode : </span>{Mode}</p>
            </div>
            <div className="invoice-items">
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Size</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Price</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.size}</td>
                                <td>{item.category}</td>
                                {(item.subcategory==="color" || (item.category==="sports" && item.subcategory==="primary")) && <td>{"3rd to 6th Class"}</td>}
                                {item.category === "sports" && item.subcategory==="pre-primary" && <td>{"Nursery to Class 2"}</td>}
                                {(item.category!=="sports") && <td>{item.subcategory}</td>}
                                <td>₹{item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="invoice-total">
                <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
            </div>
        </div>
    );
});

export default Invoice;
