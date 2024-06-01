import { createContext, useEffect, useState } from "react";
import data_product from "../components/Assets/data";
import { parse, format } from 'date-fns';
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // Fetch transaction data
    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/cart-items`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transaction data:', error);
            }
        };
        fetchTransactionData();
    }, [apiUrl]);

    // Fetch items data
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
    }, [apiUrl]);

    // Fetch cart data
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
    }, [apiUrl]);

    // Fetch products data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/items`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products data:', error);
            }
        };
        fetchData();
    }, [apiUrl]);

    // Calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item of cartItems) {
            const product = products.find(product => product.id === item.productId);
            if (product && product.sizes[0]) {
                totalAmount += product.sizes[0][item.size].price * item.quantity;
            }
        }
        return totalAmount;
    };

    // Get price by ID and size
    const getPriceByIdAndSize = (id, size) => {
        const product = products.find(product => product.id === id);
        return product?.sizes[0][size]?.price;
    }

    // Calculate total number of cart items
    const getTotalCartItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Update cart item quantity
    const updateCartItemQuantity = async (id, size, quantity) => {
        try {
            await axios.put(`${apiUrl}/api/cart/${id}`, { size, quantity });
            setCartItems(prevCartItems =>
                prevCartItems.map(item =>
                    item.productId === id && item.size === size
                        ? { ...item, quantity }
                        : item
                )
            );
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    // Remove cart item
    const removeCartItem = async (id, size) => {
        try {
            await axios.delete(`${apiUrl}/api/cart/${id}`, { data: { size } });
            setCartItems(prevCartItems =>
                prevCartItems.filter(item => !(item.productId === id && item.size === size))
            );
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    // Filter products
    const filterProducts = (category, subcategory, itemName) => {
        return products.filter(product => {
            return (
                (!category || product.category === category) &&
                (!subcategory || product.subcategory === subcategory) &&
                (!itemName || product.name.toLowerCase().includes(itemName.toLowerCase()))
            );
        });
    };

    // Update product size
    const updateProductSize = async (productId, size, newQuantity) => {
        try {
            const productToUpdate = products.find(product => product.id === productId);
            if (!productToUpdate) throw new Error("Product not found");

            const updatedSizes = { ...productToUpdate.sizes[0] };
            if (updatedSizes[size]) {
                updatedSizes[size].quantity = newQuantity;
            }

            await axios.put(`${apiUrl}/api/items/${productId}`, {
                sizes: updatedSizes,
            });

            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === productId
                        ? { ...product, sizes: [updatedSizes] }
                        : product
                )
            );
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Update product price
    const updateProductPrice = async (productId, size, newPrice) => {
        try {
            const productToUpdate = products.find(product => product.id === productId);
            if (!productToUpdate) throw new Error("Product not found");

            const updatedSizes = { ...productToUpdate.sizes[0] };
            if (updatedSizes[size]) {
                updatedSizes[size].price = newPrice;
            }

            await axios.put(`${apiUrl}/api/items/${productId}`, {
                sizes: updatedSizes,
            });

            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === productId
                        ? { ...product, sizes: [updatedSizes] }
                        : product
                )
            );
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Get transactions summary by date
    const getTransactionsSummary = (date) => {
        const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
        const filteredTransactions = transactions.filter((transaction) => {
            const transactionDate = parse(transaction.dateTime, 'dd/MM/yyyy, hh:mm a', new Date());
            return format(transactionDate, 'yyyy-MM-dd') === format(parsedDate, 'yyyy-MM-dd');
        });

        const transactionsByTime = filteredTransactions.reduce((acc, transaction) => {
            const time = format(parse(transaction.dateTime, 'dd/MM/yyyy, hh:mm a', new Date()), 'hh:mm a');
            if (!acc[time]) {
                acc[time] = {
                    transactions: [],
                    totalQuantity: 0,
                    totalPrice: 0,
                    mode: "",
                };
            }
            acc[time].transactions.push(transaction);
            acc[time].totalQuantity += transaction.quantity;
            acc[time].totalPrice += transaction.subtotal;
            acc[time].mode = transaction.mode || acc[time].mode;
            return acc;
        }, {});

        const sortedTransactionsByTime = Object.entries(transactionsByTime)
            .sort((a, b) => parse(a[0], 'hh:mm a', new Date()) - parse(b[0], 'hh:mm a'))
            .map(([time, data]) => ({ time, ...data }));

        const grandTotalSales = filteredTransactions.reduce((acc, transaction) => acc + transaction.subtotal, 0);
        const grandTotalProducts = filteredTransactions.reduce((acc, transaction) => acc + transaction.quantity, 0);

        return {
            transactionsByTime: sortedTransactionsByTime,
            grandTotalSales,
            grandTotalProducts,
        };
    };

    // Filter transactions by date
    const filterTransactionsByDate = (date) => {
        const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = parse(transaction.dateTime, 'dd/MM/yyyy, hh:mm a', new Date());
            return format(transactionDate, 'yyyy-MM-dd') === format(parsedDate, 'yyyy-MM-dd');
        });

        const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
            const { id, name, category, subcategory, size } = transaction;
            const color = subcategory === "color" ? name.split('(')[1].slice(0, -1) : null;
            const key = `${id}_${name}_${category}_${subcategory}_${color}_${size}`;
            groups[key] = groups[key] || { id, name, category, subcategory, color, size, totalQuantity: 0 };
            groups[key].totalQuantity += transaction.quantity;
            return groups;
        }, {});

        return Object.values(groupedTransactions)
            .sort((a, b) => b.totalQuantity - a.totalQuantity);
    };

    // Update product quantities based on cart details
    const updateDateSet = async (cartDetails) => {
        try {
            const productUpdates = {};

            for (const cartItem of cartDetails) {
                const { id, size, quantity } = cartItem;
                const productToUpdate = products.find(product => Number(product.id) === id);

                if (productToUpdate) {
                    const updatedSizes = { ...productToUpdate.sizes[0] };
                    if (updatedSizes[size] !== undefined) {
                        updatedSizes[size].quantity -= parseInt(quantity, 10);
                    }
                    productUpdates[id] = { ...productToUpdate, sizes: updatedSizes };
                }
            }

            for (const productId in productUpdates) {
                const updatedProduct = productUpdates[productId];
                await axios.put(`${apiUrl}/api/items/${productId}`, {
                    sizes: updatedProduct.sizes,
                });
            }

            setProducts(prevProducts =>
                prevProducts.map(product => productUpdates[product.id] || product)
            );
        } catch (error) {
            console.error('Error updating product quantities:', error);
        }
    };

    const contextValue = {
        data_product,
        cartItems,
        setCartItems,
        getTotalCartAmount,
        getTotalCartItems,
        updateCartItemQuantity,
        removeCartItem,
        filterProducts,
        updateProductSize,
        updateProductPrice,
        items,
        updateDateSet,
        transactions,
        getTransactionsSummary,
        filterTransactionsByDate,
        getPriceByIdAndSize
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
