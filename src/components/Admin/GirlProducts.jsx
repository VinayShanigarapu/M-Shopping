import React, { useContext, useState } from 'react';
import '../css/admin.css';
import Swal from 'sweetalert2';
import { entries } from 'lodash';
import { ShopContext } from '../../Context/ShopContext';

const GirlProducts = () => {


    const { filterProducts, updateProductPrice, updateProductSize } = useContext(ShopContext);
    const [activeBox, setActiveBox] = useState(1);

    const handleBoxClick = (boxNumber) => {
        setActiveBox(boxNumber);
    };

    const prePrimaryGirlsTshirts = filterProducts('girls', 'pre-primary', 'Frock');
    const PrimaryGirlsTshirts = filterProducts('girls', 'primary', 'T-shirts');
    const PrimaryGirlsShorts = filterProducts('girls', 'primary', 'Shorts');

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
                        <h2 className="topic-heading">Pre Primary</h2>
                        <h2 className="topic">Girls Products</h2>
                    </div>
                </div>

                <div className={`box box2 ${activeBox === 2 ? 'active' : ''}`} onClick={() => handleBoxClick(2)}>
                    <div className="text">
                        <h2 className="topic-heading">Primary</h2>
                        <h2 className="topic">Girls Products</h2>
                    </div>
                </div>
            </div>

            {activeBox === 1 && (
                <>
                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">Pre-Primary Girls Frocks</h1>
                            <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdatePrice(prePrimaryGirlsTshirts[0].id)}>Update Price</h3>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {prePrimaryGirlsTshirts.map((product) => (
                                product.sizes[0] &&
                                entries(product.sizes[0]).map(([size, quantity]) => (
                                    <div className="item1" key={`${product.id}-${size}`}>
                                        <h3 className="t-op-nextlvl">{product.name}</h3>
                                        <h3 className="t-op-nextlvl">{size}</h3>
                                        <h3 className="t-op-nextlvl">{product.price}</h3>
                                        <h3 className="t-op-nextlvl">{quantity}</h3>
                                        <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)}>Update</h3>
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
                            <h1 className="recent-Articles">Primary Girls T-Shirts</h1>
                            <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdatePrice(PrimaryGirlsTshirts[0].id)}>Update Price</h3>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {PrimaryGirlsTshirts.map((product) => (
                                product.sizes[0] &&
                                entries(product.sizes[0]).map(([size, quantity]) => (
                                    <div className="item1" key={`${product.id}`}>
                                        <h3 className="t-op-nextlvl">{product.name}</h3>
                                        <h3 className="t-op-nextlvl">{size}</h3>
                                        <h3 className="t-op-nextlvl">{product.price}</h3>
                                        <h3 className="t-op-nextlvl">{quantity}</h3>
                                        <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)} >Update</h3>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>

                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">Primary Girls  Skirts</h1>
                            <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdatePrice(PrimaryGirlsShorts[0].id)}>Update Price</h3>
                        </div>

                        <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Product</h3>
                                <h3 className="t-op">Size</h3>
                                <h3 className="t-op">Price (in Rs)</h3>
                                <h3 className="t-op">Quantity</h3>
                                <h3 className="t-op">Modify</h3>
                            </div>
                            {PrimaryGirlsShorts.map(product => (
                                product.sizes.map(sizeObj => (
                                    entries(sizeObj).map(([size, quantity]) => (
                                        <div className="item1" key={`${product.id}-${size}`}>
                                            <h3 className="t-op-nextlvl">{product.name}</h3>
                                            <h3 className="t-op-nextlvl">{size}</h3>
                                            <h3 className="t-op-nextlvl">{product.price}</h3>
                                            <h3 className="t-op-nextlvl">{quantity}</h3>
                                            <h3 className="t-op-nextlvl label-tag" onClick={() => handleUpdateSize(product.id, size)}>Update</h3>
                                        </div>
                                    ))
                                ))
                            ))}
                        </div>
                    </div>


                </>
            )}
        </>



    )
}

export default GirlProducts
