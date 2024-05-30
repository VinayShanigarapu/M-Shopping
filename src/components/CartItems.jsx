import React, { useContext, useEffect, useRef, useState } from 'react';
import './css/CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from './Assets/cart_cross_icon.png';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useReactToPrint } from 'react-to-print';
import Invoice from './Invoice';
import Toast from './Toast';
import axios from 'axios';
import Swal from 'sweetalert2';

export const CartItems = () => {
    const {data_product, cartItems, getTotalCartAmount, updateCartItemQuantity, removeCartItem, updateDateSet } = useContext(ShopContext);
    const [showToast, setShowToast] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const apiUrl = process.env.REACT_APP_API_URL || '';
    const [Mode, setMode] = useState()

    const cartItemsWithDetails = cartItems.map(cartItem => {
        const product = data_product.find(product => product.id === Number(cartItem.productId));
        return product ? { ...product,price: cartItem.price, quantity: cartItem.quantity, size: cartItem.size, subtotal: cartItem.quantity * cartItem.price } : null;
    }).filter(item => item !== null);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    const formattedDateTime = currentDateTime.toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });

    const componentRef = useRef();
    const handlePayment = useReactToPrint({
        content: () => componentRef.current,
    });

    const totalAmount = getTotalCartAmount();

    const updateMainDataSet = async () => {
        updateDateSet(cartItemsWithDetails)
    };
    const saveCartItems = async (mode) => {
        try {
            const cartItemsWithDateTime = cartItemsWithDetails.map(item => ({
                ...item,
                dateTime: formattedDateTime,
                mode: mode
            }));
            await axios.post(`${apiUrl}/api/cart-items`, cartItemsWithDateTime);
            console.log('Cart items saved successfully');
        } catch (error) {
            console.error('Error saving cart items:', error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete(`${apiUrl}/api/cart`);
            console.log('All cart items deleted successfully');
        } catch (error) {
            console.error('Error deleting cart items:', error);
        }
    };

    const upiPayment = async () => {
        if (cartItemsWithDetails.length > 0) {
            setMode("UPI")
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "green",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, proceed to checkout!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await saveCartItems("UPI");
                    await updateMainDataSet();
                    Swal.fire({
                        title: "Checked Out!",
                        text: "Your checkout process done.",
                        icon: "success"
                    }).then( async () => {
                        await clearCart();
                        window.location.reload();
                    });
                    handlePayment();
                }
            });
        } else {
            setShowToast(true);
        }
    };
    const cashOutPayment = async () => {
        if (cartItemsWithDetails.length > 0) {
            setMode("Cashout")
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "green",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, proceed to checkout!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await saveCartItems("Cashout");
                    await updateMainDataSet();
                    Swal.fire({
                        title: "Checked Out!",
                        text: "Your checkout process done.",
                        icon: "success"
                    }).then( async () => {
                        await clearCart();
                        window.location.reload();
                    });
                    handlePayment();
                }
            });
        } else {
            setShowToast(true);
        }
    };

    return (
        <div className='cartitems'>
            <div className='cartitems-format-main'>
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {cartItemsWithDetails.map(cartItem => (
                <div key={cartItem.id}>
                    <div className='cartitems-format cartitems-format-main'>
                        <img src={cartItem.image} alt='' className='carticon-product-icon' />
                        <div>
                            <p>{cartItem.name}</p>
                            <p className="cart-item-size">Size: {cartItem.size}</p>
                        </div>
                        <p>₹{cartItem.price}</p>
                        <div className='cartitems-quantity'>
                            <AiOutlineMinus
                                className='quantity'
                                onClick={() => {
                                    if (cartItem.quantity > 1) {
                                        updateCartItemQuantity(cartItem.id.toString(), cartItem.size, cartItem.quantity - 1);
                                    }
                                    else if(cartItem.quantity === 1)
                                        removeCartItem(cartItem.id.toString(), cartItem.size)
                                }}
                            />
                            <button>{cartItem.quantity}</button>
                            <AiOutlinePlus
                                className="quantity"
                                onClick={() => updateCartItemQuantity(cartItem.id.toString(), cartItem.size, cartItem.quantity + 1)}
                            />
                        </div>
                        <p>₹{cartItem.price * cartItem.quantity}</p>
                        <img
                            className='cartitems-remove-icon'
                            src={remove_icon}
                            alt=''
                            onClick={() => removeCartItem(cartItem.id.toString(), cartItem.size)}
                        />
                    </div>
                    <hr />
                </div>
            ))}
            <div className="cartitem-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>₹{totalAmount}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>₹{totalAmount}</h3>
                        </div>
                    </div>
                    <div className='checkout'>
                        <button onClick={upiPayment}>UPI</button>
                        <button onClick={cashOutPayment}>Cash Out</button>
                    </div>
                    <div style={{ display: 'none' }}>
                        <Invoice ref={componentRef} invoiceData={{ items: cartItemsWithDetails }} totalAmount={totalAmount} Mode={Mode} />
                    </div>
                </div>
            </div>
            {showToast && <Toast message="Please Add Products to Cart!!" toastType="warning" duration={5000} />}
        </div>
    );
}

export default CartItems;
