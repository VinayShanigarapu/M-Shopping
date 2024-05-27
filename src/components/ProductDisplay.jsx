import React, { useContext, useEffect, useState } from 'react';
import './css/ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import Toast from './Toast';
import axios from 'axios';

export const ProductDisplay = (props) => {
    const { product } = props;
    const { cartItems, setCartItems, updateCartItemQuantity } = useContext(ShopContext);
    const [items, setItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedLength, setSelectedLength] = useState(null);
    const [selectedWaist, setSelectedWaist] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [stock, setStock] = useState({});
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    const [databasePrice, setDatabasePrice] = useState();
    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const response = await axios.get('/api/items');
                setItems(response.data);
                console.log(response.data)
                const itemData = response.data.find(item => item.id === product.id.toString());
                setDatabasePrice(itemData.price)

            } catch (error) {
                console.error('Error fetching items data:', error);
            }
        };

        fetchItemsData();
    }, []);

    useEffect(() => {
        const itemData = items.find(item => item.id === product.id.toString());
        setStock(itemData ? itemData.sizes : {});
    }, [items, product.id.toString()]);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
        checkStock(size);
    };

    const handleLengthClick = (length) => {
        setSelectedLength(length);
        checkStock(`${length}*${selectedWaist}`);
    };

    const handleWaistClick = (waist) => {
        setSelectedWaist(waist);
        checkStock(`${selectedLength}*${waist}`);
    };

    const checkStock = (size) => {
        if (stock[0][size] > 0) {
            setIsOutOfStock(false);
        } else {
            setIsOutOfStock(true);
        }
    };

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.get('/api/cart');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [setCartItems]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const addCartItems = async (productData) => {
        try {
            await axios.post('/api/cart', [productData]);
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
                price: databasePrice,
                quantity: 1,
                size: finalSize,
            };
            await addCartItems(productData);
            setCartItems([...cartItems, productData]);
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
                    <div className="productdisplay-right-price">₹{databasePrice}</div>
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
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "boys" && product.subcategory === "pre-primary" && product.name === "Shorts" && ['11', '12', '13', '14', '15'].map((size) => (
                            <div
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "boys" && product.subcategory === "primary" && product.name === "T-shirts" && ['4', '5', '6', '7', '8'].map((size) => (
                            <div
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "boys" && product.subcategory === "primary" && product.name === "Shorts" && ['16', '17', '18', '19', '20'].map((size) => (
                            <div
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "girls" && product.subcategory === "pre-primary" && product.name === "Frock" && ['1', '2', '3', '4', '5', '6'].map((size) => (
                            <div
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "girls" && product.subcategory === "primary" && product.name === "T-shirts" && ['3', '4', '5', '6', '7'].map((size) => (
                            <div
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
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "sports" && product.subcategory === "pre-primary" && product.name === "Sports Shorts" && ['11', '12', '13', '14', '15', '16'].map((size) => (
                            <div
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "sports" && product.subcategory === "primary" && product.name === "Sports Trousers" && ['3', '4', '5', '6', '7'].map((size) => (
                            <div
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                        {product.category === "sports" && product.subcategory === "color" && (product.name).includes("Sports T-shirts") && ['3', '4', '5', '6', '7'].map((size) => (
                            <div
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="productdisplay-right-add-to-cart">
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
        </div>
    );
}

export default ProductDisplay;