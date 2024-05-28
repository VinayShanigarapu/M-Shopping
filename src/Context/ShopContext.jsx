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

    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const response = await axios.get('/api/cart-items');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching Transaction data:', error);
            }
        };

        fetchTransactionData();
    }, []);

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const response = await axios.get('/api/items');
                setItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching items data:', error);
            }
        };

        fetchItemsData();
    }, []);

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
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/items');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products data:', error);
            }
        };

        fetchData();
    }, []);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item of cartItems) {
            const product = products.find(product => product.id.toString() === item.productId);
            if (product) {
                totalAmount += product.price * item.quantity;
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item of cartItems) {
            totalItem += item.quantity;
        }
        return totalItem;
    };

    const updateCartItemQuantity = async (id, size, quantity) => {
        try {
            await axios.put(`/api/cart/${id}`, { size, quantity });

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

    const removeCartItem = async (id, size) => {
        try {
            await axios.delete(`/api/cart/${id}`, { data: { size } });

            setCartItems(prevCartItems =>
                prevCartItems.filter(item => !(item.productId === id && item.size === size))
            );
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const filterProducts = (category, subcategory, itemName) => {
        return products.filter(product => {
            return (
                (!category || product.category === category) &&
                (!subcategory || product.subcategory === subcategory) &&
                (!itemName || product.name.toLowerCase().includes(itemName.toLowerCase()))
            );
        });
    };

    const updateProductSize = async (productId, size, newQuantity) => {
        try {
            const productToUpdate = products.find(product => product.id === productId);
            if (!productToUpdate) throw new Error("Product not found");

            const updatedSizes = productToUpdate.sizes.map(sizeObj => {
                if (sizeObj[size] !== undefined) {
                    return { ...sizeObj, [size]: newQuantity };
                }
                return sizeObj;
            });

            await axios.put(`/api/items/${productId}`, {
                sizes: updatedSizes,
            });

            setProducts(prevProducts => {
                return prevProducts.map(product => {
                    if (product.id === productId) {
                        return {
                            ...product,
                            sizes: updatedSizes,
                        };
                    }
                    return product;
                });
            });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const updateProductPrice = async (productId, newPrice) => {
        try {
            const productToUpdate = products.find(product => product.id === productId);
            if (!productToUpdate) throw new Error("Product not found");

            await axios.put(`/api/items/${productId}`, {
                price: newPrice,
            });

            setProducts(prevProducts => {
                return prevProducts.map(product => {
                    if (product.id === productId) {
                        return {
                            ...product,
                            price: newPrice,
                        };
                    }
                    return product;
                });
            });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

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
                };
            }
            acc[time].transactions.push(transaction);
            acc[time].totalQuantity += transaction.quantity;
            acc[time].totalPrice += transaction.subtotal;
            return acc;
        }, {});

        const sortedTransactionsByTime = Object.entries(transactionsByTime)
            .sort((a, b) => {
                const timeA = parse(a[0], 'hh:mm a', new Date());
                const timeB = parse(b[0], 'hh:mm a', new Date());
                return timeA - timeB;
            })
            .map(([time, data]) => ({ time, ...data }));

        const grandTotalSales = filteredTransactions.reduce((acc, transaction) => acc + transaction.subtotal, 0);
        const grandTotalProducts = filteredTransactions.reduce((acc, transaction) => acc + transaction.quantity, 0);

        return {
            transactionsByTime: sortedTransactionsByTime,
            grandTotalSales,
            grandTotalProducts,
        };
    };

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

        const sortedTransactions = Object.values(groupedTransactions)
            .sort((a, b) => b.totalQuantity - a.totalQuantity);

        return sortedTransactions;
    };

    const updateDateSet = async (cartDetails) => {
        try {
            const productUpdates = {};
            
            for (const cartItem of cartDetails) {
                const { id, size, quantity } = cartItem;
                const productToUpdate = products.find(product => Number(product.id) === id);
                
                if (productToUpdate) {
                    const sizeObjIndex = productToUpdate.sizes.findIndex(sizeObj => sizeObj[size] !== undefined);
                    if (sizeObjIndex !== -1) {
                        if (!productUpdates[id]) {
                            productUpdates[id] = { ...productToUpdate };
                        }
                        const updatedSizeObj = {
                            ...productUpdates[id].sizes[sizeObjIndex],
                            [size]: productToUpdate.sizes[sizeObjIndex][size] - quantity
                        };
                        productUpdates[id].sizes[sizeObjIndex] = updatedSizeObj;

                        console.log(`Updating product ${id} size ${size} to quantity ${updatedSizeObj[size]}`);
                    }
                }
            }

            for (const productId in productUpdates) {
                const updatedProduct = productUpdates[productId];
                await axios.put(`/api/items/${productId}`, {
                    sizes: updatedProduct.sizes,
                });
            }

            setProducts(prevProducts => {
                return prevProducts.map(product => {
                    const updatedProduct = productUpdates[product.id];
                    if (updatedProduct) {
                        return updatedProduct;
                    }
                    return product;
                });
            });
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
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
