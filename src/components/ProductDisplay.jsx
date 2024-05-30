import React, { useContext, useEffect, useState } from 'react';
import './css/ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import Toast from './Toast';
import axios from 'axios';

export const ProductDisplay = (props) => {
    const { product } = props;
    const { cartItems, setCartItems, updateCartItemQuantity, getPriceByIdAndSize } = useContext(ShopContext);
    const [items, setItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedLength, setSelectedLength] = useState(null);
    const [selectedWaist, setSelectedWaist] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [stock, setStock] = useState({});
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    const [sizePrice, setSizePrice] = useState(product.price);
    const [cartToast, setCartToast] = useState(false);
    const [stockMessage, setStockMessage] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL || '';

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/items`);
                setItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching items data:', error);
            }
        };

        fetchItemsData();
    }, [product.id, apiUrl]);

    useEffect(() => {
        if(items){
            const itemData = items.find(item => item.id === product.id.toString());
            setStock(itemData ? itemData.sizes : {});
        }
    }, [product.id, items]);

    const handleSizeClick = async (size) => {
        setSelectedSize(size);
        await checkStockAndPrice(size);
    };

    const handleLengthClick = async (length) => {
        setSelectedLength(length);
        const size = `${length}*${selectedWaist}`;
        if(length && selectedWaist)
        await checkStockAndPrice(size);
    };

    const handleWaistClick = async (waist) => {
        setSelectedWaist(waist);
        const size = `${selectedLength}*${waist}`;
        if(selectedLength && waist)
        await checkStockAndPrice(size);
    };

    const checkStockAndPrice = async (size) => {
        if (stock[0][size] && stock[0][size].quantity > 0) {
            setIsOutOfStock(false);
            const quantity = stock[0][size].quantity;
            if (quantity >=1 && quantity <= 9) {
                setStockMessage(`Only ${quantity} pieces left!`);
            } else {
                setStockMessage('');
            }
            const price = await getPriceByIdAndSize(product.id.toString(), size);
            setSizePrice(price);
        } else {
            setIsOutOfStock(true);
            setStockMessage('');
        }
    };

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/cart`);
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [product.id, setCartItems, apiUrl]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
        if (cartToast) {
            const timer = setTimeout(() => {
                setCartToast(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [showToast,cartToast]);

    const addCartItems = async (productData) => {
        try {
            await axios.post(`${apiUrl}/api/cart`, [productData]);
            console.log('Cart items added successfully');
        } catch (error) {
            console.error('Error adding cart items:', error);
        }
    };

    const handleAddToCart = async () => {
        if (isOutOfStock) return;
        
        let finalSize = selectedSize;
        if (product.category === "girls" && product.subcategory === "primary" && product.name === "Skirts") {
            if (!selectedLength || !selectedWaist) {
                setShowToast(true);
                return;
            }
            finalSize = `${selectedLength}*${selectedWaist}`;
        } else {
            if (!selectedSize) {
                setShowToast(true);
                return;
            }
        }

        const existingCartItem = cartItems.find(item => item.productId === product.id.toString() && item.size === finalSize);
        
        if (existingCartItem) {
            const updatedProductData = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            };
            await updateCartItemQuantity(updatedProductData.productId, updatedProductData.size, updatedProductData.quantity);
        } else {
            const productData = {
                productId: product.id,
                name: product.name,
                image: product.image,
                price: sizePrice, // Use the selected size price
                quantity: 1,
                size: finalSize,
            };
            await addCartItems(productData);
            setCartItems([...cartItems, productData]);
            setCartToast(true)
        }
    };

    return (
        <div className='productdisplay'>
            <div className='productdisplay-left'>
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="ProductImage" />
                    <img src={product.image} alt="ProductImage" />
                    <img src={product.image} alt="ProductImage" />
                    <img src={product.image} alt="ProductImage" />
                </div>

                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="Product" />
                </div>
            </div>

            <div className='productdisplay-right'>
                <h1>{product.name}</h1>

                <div className='productdisplay-right-prices'>
                    <div className="productdisplay-right-price">₹{sizePrice}</div>
                </div>

                <div className="productdisplay-right-description">
                    Fabric: The shirt is made up of 100% cotton which is soft, breathable, and comfortable to wear for long hours. It is also durable and easy to care for.<br />
                    Design: The shirt features a cutaway collar which is a modern take on the classic tuxedo shirt collar. It is perfect for showcasing a bow tie and adding a touch of elegance to the overall look.
                </div>

                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {product.category === "boys" && product.subcategory === "pre-primary" && product.name === "T-shirts" && ['1', '2', '3', '4', '5'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "boys" && product.subcategory === "pre-primary" && product.name === "Shorts" && ['11', '12', '13', '14', '15'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "boys" && product.subcategory === "primary" && product.name === "T-shirts" && ['4', '5', '6', '7', '8'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "boys" && product.subcategory === "primary" && product.name === "Shorts" && ['16', '17', '18', '19', '20'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "girls" && product.subcategory === "pre-primary" && product.name === "Frock" && ['1', '2', '3', '4', '5', '6'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "girls" && product.subcategory === "primary" && product.name === "T-shirts" && ['3', '4', '5', '6', '7'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "girls" && product.subcategory === "primary" && product.name === "Skirts" && (
                            <div className="size-columns">
                                <div className="size-column">
                                    <h3>Length:</h3>
                                    {['17', '18', '19', '20', '21', '22', '23', '24'].map((length) => (
                                        <div
                                            key={length}
                                            className={`size-option ${selectedLength === length ? 'selected' : ''}`}
                                            onClick={() => handleLengthClick(length)}
                                        >
                                            {length}
                                        </div>
                                    ))}
                                </div>
                                <div className="size-column">
                                    <h3>Waist:</h3>
                                    {['24', '26', '28', '30', '32', '34'].map((waist) => (
                                        <div
                                            key={waist}
                                            className={`size-option ${selectedWaist === waist ? 'selected' : ''}`}
                                            onClick={() => handleWaistClick(waist)}
                                        >
                                            {waist}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {product.category === "sports" && product.subcategory === "pre-primary" && product.name === "Sports T-shirts" && ['18', '20', '22', '24', '26', '28'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "sports" && product.subcategory === "pre-primary" && product.name === "Sports Shorts" && ['11', '12', '13', '14', '15', '16'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "sports" && product.subcategory === "primary" && product.name === "Sports Trousers" && ['3', '4', '5', '6', '7'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "sports" && product.subcategory === "color" && (product.name).includes("Sports T-shirts") && ['3', '4', '5', '6', '7'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="productdisplay-right-add-to-cart">
                    {stockMessage && <div className="stock-message out-of-stock-message">{stockMessage}</div>}
                    {isOutOfStock && <div className="out-of-stock-message">Temporarily out of stock.</div>}

                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className={isOutOfStock ? 'disabled' : ''}
                    >
                        Add to Cart
                    </button>
                </div>

                <p className='productdisplay-right-category'><span>Category:</span> {product.name} with Cool and comfort</p>
                <p className='productdisplay-right-category'><span>Tags:</span> Modern, {product.name}, Cool, Comfort</p>
            </div>
            {showToast && <Toast message="Please select all required sizes." toastType="warning" duration={5000} />}
            {cartToast && <Toast message="Item added to cart Successfully." toastType="success" duration={1500} />}
        </div>
    );
}

export default ProductDisplay;
