import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { ShopContext } from '../../Context/ShopContext';
import '../css/admin.css';

const SportsProduct = () => {
    const { filterProducts, updateProductSize, updateProductPrice } = useContext(ShopContext);
    const [activeBox, setActiveBox] = useState(1);

    const handleBoxClick = (boxNumber) => {
        setActiveBox(boxNumber);
    };

    const prePrimarySportsTshirts = filterProducts('sports', 'pre-primary', 'T-shirts');
    const prePrimarySportsShorts = filterProducts('sports', 'pre-primary', 'Shorts');
    const PrimarySportsTshirtsYellow = filterProducts('sports', 'color', 'Sports T-shirts (Yellow)');
    const PrimarySportsTshirtsRed = filterProducts('sports', 'color', 'Sports T-shirts (Red)');
    const PrimarySportsTshirtsGreen = filterProducts('sports', 'color', 'Sports T-shirts (Green)');
    const PrimarySportsTshirtsBlue = filterProducts('sports', 'color', 'Sports T-shirts (Blue)');


    const PrimarySportsShorts = filterProducts('sports', 'primary', 'Sports Trousers');


    const handleUpdate = async (productId, size) => {
        const { value: formValues } = await Swal.fire({
            title: 'Modify Quantity or Price',
            html: `
                <input id="swal-input-quantity" placeholder="Quantity" type="number" class="swal2-input">
                <input id="swal-input-price" placeholder="Price" type="number" class="swal2-input" min="1">
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const quantity = document.getElementById('swal-input-quantity').value;
                const price = document.getElementById('swal-input-price').value;
                if (!quantity && !price) {
                    Swal.showValidationMessage('Please enter either quantity or price');
                    return false;
                }
                if (quantity && quantity<0) {
                    Swal.showValidationMessage('Quantity should not be negative.');
                    return false;
                }
                if (price && price<=0) {
                    Swal.showValidationMessage('Price should be more than zero.');
                    return false;
                }
                return { quantity: parseInt(quantity), price: parseInt(price) };
            },
        });

        if (formValues) {
            const { quantity, price } = formValues;
            if (quantity!==undefined) {
                updateProductSize(productId, size, quantity);
            }
            if (price) {
                updateProductPrice(productId, size, price);
            }
        }
    };
    const renderProductList = (products) => {
        return products.map((product) => (
            Object.entries(product.sizes[0]).map(([size, { price, quantity }]) => (
                <div className="item1" key={`${product.id}-${size}`}>
                    <h3 className="t-op-nextlvl">{product.name}</h3>
                    <h3 className="t-op-nextlvl">{size}</h3>
                    <h3 className="t-op-nextlvl">{price}</h3>
                    <h3 className="t-op-nextlvl">{quantity}</h3>
                    <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdate(product.id, size)}>Update</h3>
                </div>
            ))
        ));
    };

    return (
        <>
            <div className="box-container">
                <div className={`box box1 ${activeBox === 1 ? 'active' : ''}`} onClick={() => handleBoxClick(1)}>
                    <div className="text">
                        <h2 className="topic-heading">Nursery to Class 2</h2>
                        <h2 className="topic">Sports Products</h2>
                    </div>
                </div>

                <div className={`box box2 ${activeBox === 2 ? 'active' : ''}`} onClick={() => handleBoxClick(2)}>
                    <div className="text">
                        <h2 className="topic-heading">3rd to 6th Class</h2>
                        <h2 className="topic">Sports Products</h2>
                    </div>
                </div>
            </div>

            {activeBox === 1 && (
                <>
                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">Nursery to Class 2 Sports T-Shirts</h1>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {renderProductList(prePrimarySportsTshirts)}
                        </div>
                    </div>

                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">Nursery to Class 2 Sports Shorts</h1>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {renderProductList(prePrimarySportsShorts)}
                        </div>
                    </div>
                </>
            )}

            {activeBox === 2 && (
                <>
                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">3rd to 6th Class Sports Trousers</h1>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {renderProductList(PrimarySportsShorts)}
                        </div>
                    </div>

                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">3rd to 6th Class Sports T-Shirts  </h1>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {renderProductList(PrimarySportsTshirtsYellow)}

                            {renderProductList(PrimarySportsTshirtsRed)}

                            {renderProductList(PrimarySportsTshirtsBlue)}

                            {renderProductList(PrimarySportsTshirtsGreen)}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default SportsProduct
