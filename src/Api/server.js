require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch((error) => console.error('MongoDB connection error:', error));

const itemSchema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    category: String,
    subcategory: String,
    price: Number,
    sizes: [Object]
});

const Item = mongoose.model('Item', itemSchema);

const cartItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    size: String,
    category: String,
    subcategory: String,
    price: Number,
    quantity: Number,
    subtotal: Number,
    dateTime: String,
    mode: String
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

const cartSchema = new mongoose.Schema({
    productId: String,
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    size: String,
});

const Cart = mongoose.model('Cart', cartSchema);

app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(400).send('Error retrieving items');
    }
});

app.post('/api/items', async (req, res) => {
    const items = req.body;
    try {
        for (const item of items) {
            await Item.create(item);
        }
        res.status(200).send('Items added successfully');
    } catch (error) {
        res.status(400).send('Error adding items');
    }
});

app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { sizes, price, total_quantity } = req.body;

    try {
        const item = await Item.findOneAndUpdate(
            { id },
            { $set: { sizes, price, total_quantity } },
            { new: true }
        );

        if (!item) {
            return res.status(404).send('Item not found');
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(400).send('Error updating item');
    }
});

app.post('/api/cart', async (req, res) => {
    const cartItems = req.body;
    try {
        for (const item of cartItems) {
            const existingItem = await Cart.findOne({ productId: item.productId, size: item.size });
            if (existingItem) {
                existingItem.quantity += item.quantity;
                await existingItem.save();
            } else {
                await Cart.create(item);
            }
        }
        res.status(200).send('Cart items added or updated successfully');
    } catch (error) {
        res.status(400).send('Error adding or updating cart items');
    }
});

app.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(400).send('Error retrieving cart items');
    }
});

app.post('/api/cart-items', async (req, res) => {
    const cartItems = req.body;
    try {
        await CartItem.insertMany(cartItems);
        res.status(200).send('Cart items saved successfully');
    } catch (error) {
        res.status(400).send('Error saving cart items');
    }
});

app.get('/api/cart-items', async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(400).send('Error retrieving cart items');
    }
});

app.put('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
    const { size, quantity } = req.body;

    try {
        const cartItem = await Cart.findOne({ productId: id, size });
        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
            res.status(200).send('Cart item updated successfully');
        } else {
            res.status(404).send('Cart item not found');
        }
    } catch (error) {
        res.status(400).send('Error updating cart item');
    }
});

app.delete('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
    const { size } = req.body;

    try {
        const cartItem = await Cart.findOneAndDelete({ productId: id, size });
        if (cartItem) {
            res.status(200).send('Cart item deleted successfully');
        } else {
            res.status(404).send('Cart item not found');
        }
    } catch (error) {
        res.status(400).send('Error deleting cart item');
    }
});

app.delete('/api/cart', async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.status(200).send('All cart items deleted successfully');
    } catch (error) {
        res.status(400).send('Error deleting cart items');
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
