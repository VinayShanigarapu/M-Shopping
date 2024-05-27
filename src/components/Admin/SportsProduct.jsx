import React, { useContext, useState } from 'react';
import '../css/admin.css';
import Swal from 'sweetalert2';
import { entries } from 'lodash';
import { ShopContext } from '../../Context/ShopContext';

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


    const handleUpdateSize = async (productId, size, newQuantity) => {
        const { value: formValues } = await Swal.fire({
            title: 'Modify Quantity',
            html: `
                <input id="swal-input1" required placeholder="Quantity" type="number" class="swal2-input" min="1">
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const quantity = document.getElementById('swal-input1').value;
                if (!quantity || quantity < 0) {
                    Swal.showValidationMessage('Quantity must be a positive number');
                    return false;
                }
                return [quantity];
            },
        });
    
        if (formValues) {
            const [newQuantity] = formValues;
            updateProductSize(productId, size, parseInt(newQuantity));
        }
    };
    
    const handleUpdatePrice = async (productId) => {
        const { value: formValues } = await Swal.fire({
            title: 'Modify Price',
            html: `
                <input id="swal-input1" required placeholder="Price" type="number" class="swal2-input" min="1">
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                    const price = document.getElementById('swal-input1').value;
                    if (!price || price <= 0) {
                        Swal.showValidationMessage('Price must be a positive number');
                        return false;
                    }
                    return [price];
            },
        });

        if (formValues) {
            const [newPrice] = formValues;
            updateProductPrice(productId, parseInt(newPrice));
        }
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
                            <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdatePrice(prePrimarySportsTshirts[0].id)}>Update Price</h3>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {prePrimarySportsTshirts.map((product) => (
                                product.sizes[0] &&
                                entries(product.sizes[0]).map(([size, quantity]) => (
                                    <div className="item1" key={`${product.id}-${size}`}>
                                        <h3 className="t-op-nextlvl">{product.name}</h3>
                                        <h3 className="t-op-nextlvl">{size}</h3>
                                        <h3 className="t-op-nextlvl">{product.price}</h3>
                                        <h3 className="t-op-nextlvl">{quantity}</h3>
                                        <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)}  >Update</h3>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>

                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">Nursery to Class 2 Sports Shorts</h1>
                            <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdatePrice(prePrimarySportsShorts[0].id)}>Update Price</h3>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {prePrimarySportsShorts.map((product) => (
                                product.sizes[0] &&
                                entries(product.sizes[0]).map(([size, quantity]) => (
                                    <div className="item1" key={`${product.id}-${size}`}>
                                        <h3 className="t-op-nextlvl">{product.name}</h3>
                                        <h3 className="t-op-nextlvl">{size}</h3>
                                        <h3 className="t-op-nextlvl">{product.price}</h3>
                                        <h3 className="t-op-nextlvl">{quantity}</h3>
                                        <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)}  >Update</h3>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                </>
            )}

            {activeBox === 2 && (
                <>
                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">3rd to 6th Class Sports Trousers</h1>
                            <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdatePrice(PrimarySportsShorts[0].id)}>Update Price</h3>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {PrimarySportsShorts.map((product) => (
                                product.sizes[0] &&
                                entries(product.sizes[0]).map(([size, quantity]) => (
                                    <div className="item1" key={`${product.id}-${size}`}>
                                        <h3 className="t-op-nextlvl">{product.name}</h3>
                                        <h3 className="t-op-nextlvl">{size}</h3>
                                        <h3 className="t-op-nextlvl">{product.price}</h3>
                                        <h3 className="t-op-nextlvl">{quantity}</h3>
                                        <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)}  >Update</h3>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>

                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">3rd to 6th Class Sports T-Shirts  </h1>
                            <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdatePrice(PrimarySportsTshirtsYellow[0].id)}>Update Price</h3>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {PrimarySportsTshirtsYellow.map((product) => (
                                product.sizes[0] &&
                                entries(product.sizes[0]).map(([size, quantity]) => (
                                    <div className="item1" key={`${product.id}-${size}`}>
                                        <h3 className="t-op-nextlvl">{product.name}</h3>
                                        <h3 className="t-op-nextlvl">{size}</h3>
                                        <h3 className="t-op-nextlvl">{product.price}</h3>
                                        <h3 className="t-op-nextlvl">{quantity}</h3>
                                        <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)}  >Update</h3>
                                    </div>
                                ))
                            ))}

                            {PrimarySportsTshirtsRed.map((product) => (
                                product.sizes[0] &&
                                entries(product.sizes[0]).map(([size, quantity]) => (
                                    <div className="item1" key={`${product.id}-${size}`}>
                                        <h3 className="t-op-nextlvl">{product.name}</h3>
                                        <h3 className="t-op-nextlvl">{size}</h3>
                                        <h3 className="t-op-nextlvl">{product.price}</h3>
                                        <h3 className="t-op-nextlvl">{quantity}</h3>
                                        <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)}  >Update</h3>
                                    </div>
                                ))
                            ))}



                            {PrimarySportsTshirtsBlue.map((product) => (
                                product.sizes[0] &&
                                entries(product.sizes[0]).map(([size, quantity]) => (
                                    <div className="item1" key={`${product.id}-${size}`}>
                                        <h3 className="t-op-nextlvl">{product.name}</h3>
                                        <h3 className="t-op-nextlvl">{size}</h3>
                                        <h3 className="t-op-nextlvl">{product.price}</h3>
                                        <h3 className="t-op-nextlvl">{quantity}</h3>
                                        <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)}  >Update</h3>
                                    </div>
                                ))
                            ))}


                            {PrimarySportsTshirtsGreen.map((product) => (
                                product.sizes[0] &&
                                entries(product.sizes[0]).map(([size, quantity]) => (
                                    <div className="item1" key={`${product.id}-${size}`}>
                                        <h3 className="t-op-nextlvl">{product.name}</h3>
                                        <h3 className="t-op-nextlvl">{size}</h3>
                                        <h3 className="t-op-nextlvl">{product.price}</h3>
                                        <h3 className="t-op-nextlvl">{quantity}</h3>
                                        <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)}  >Update</h3>
                                    </div>
                                ))
                            ))}




                        </div>
                    </div>


                </>
            )}
        </>
    )
}

export default SportsProduct
