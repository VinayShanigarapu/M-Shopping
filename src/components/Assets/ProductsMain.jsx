import mens_shorts_2 from './mens-shorts-2.png';
import mens_shorts from './mens-shorts.jpg';
import mens_t_shirt_2 from './mens-t-shirt-2.png';
import mens_t_shirt from './mens-t-shirt.jpg';
import sports_shorts from './sports-shorts.jpg';
import sports_t_shirt_2 from './sports-t-shirt-2.jpeg';
import sports_t_shirt from './sports-t-shirt.jpg';
import sports_trousers from './sports-trousers.png';
import womens_shorts_2 from './womens-shorts-2.png';
import womens_t_shirt_2 from './womens-t-shirt-2.png';
import womens_t_shirt from './womens-t-shirt.jpg';

let main_data = [
    {
        id: 1,
        name: "T-shirts",
        category: "boys",
        subcategory: "pre-primary",
        image: mens_t_shirt,
        sizes: {
            "1": { price: 35.00, quantity: 30 },
            "2": { price: 40.00, quantity: 80 },
            "3": { price: 45.00, quantity: 100 },
            "4": { price: 50.00, quantity: 120 },
            "5": { price: 55.00, quantity: 60 }
        }
    },
    {
        id: 2,
        name: "Shorts",
        category: "boys",
        subcategory: "pre-primary",
        image: mens_shorts,
        sizes: {
            "11": { price: 40.00, quantity: 40 },
            "12": { price: 45.00, quantity: 80 },
            "13": { price: 50.00, quantity: 80 },
            "14": { price: 55.00, quantity: 100 },
            "15": { price: 60.00, quantity: 100 }
        }
    },
    {
        id: 3,
        name: "Frock",
        category: "girls",
        subcategory: "pre-primary",
        image: womens_t_shirt,
        sizes: {
            "1": { price: 30.00, quantity: 30 },
            "2": { price: 35.00, quantity: 60 },
            "3": { price: 40.00, quantity: 100 },
            "4": { price: 45.00, quantity: 100 },
            "5": { price: 50.00, quantity: 80 },
            "6": { price: 55.00, quantity: 60 }
        }
    },
    {
        id: 4,
        name: "T-shirts",
        category: "boys",
        subcategory: "primary",
        image: mens_t_shirt_2,
        sizes: {
            "4": { price: 40.00, quantity: 40 },
            "5": { price: 45.00, quantity: 100 },
            "6": { price: 50.00, quantity: 120 },
            "7": { price: 55.00, quantity: 80 },
            "8": { price: 60.00, quantity: 40 }
        }
    },
    {
        id: 5,
        name: "Shorts",
        category: "boys",
        subcategory: "primary",
        image: mens_shorts_2,
        sizes: {
            "16": { price: 100.00, quantity: 100 },
            "17": { price: 105.00, quantity: 80 },
            "18": { price: 110.00, quantity: 80 },
            "19": { price: 115.00, quantity: 30 },
            "20": { price: 120.00, quantity: 30 }
        }
    },
    {
        id: 6,
        name: "T-shirts",
        category: "girls",
        subcategory: "primary",
        image: womens_t_shirt_2,
        sizes: {
            "3": { price: 40.00, quantity: 40 },
            "4": { price: 45.00, quantity: 120 },
            "5": { price: 50.00, quantity: 120 },
            "6": { price: 55.00, quantity: 80 },
            "7": { price: 60.00, quantity: 40 }
        }
    },
    {
        id: 7,
        name: "Skirts",
        category: "girls",
        subcategory: "primary",
        image: womens_shorts_2,
        sizes: {
            "17*26": { price: 20.00, quantity: 20 },
            "17*28": { price: 22.00, quantity: 20 },
            "18*24": { price: 24.00, quantity: 20 },
            "18*26": { price: 26.00, quantity: 20 },
            "18*28": { price: 28.00, quantity: 20 },
            "19*24": { price: 30.00, quantity: 20 },
            "19*26": { price: 32.00, quantity: 20 },
            "19*28": { price: 34.00, quantity: 20 },
            "20*24": { price: 36.00, quantity: 20 },
            "20*26": { price: 38.00, quantity: 20 },
            "20*28": { price: 40.00, quantity: 20 },
            "21*28": { price: 42.00, quantity: 20 },
            "21*30": { price: 44.00, quantity: 20 },
            "22*28": { price: 46.00, quantity: 20 },
            "22*30": { price: 48.00, quantity: 20 },
            "22*32": { price: 50.00, quantity: 20 },
            "23*30": { price: 52.00, quantity: 20 },
            "23*32": { price: 54.00, quantity: 20 },
            "23*34": { price: 56.00, quantity: 20 },
            "24*30": { price: 58.00, quantity: 20 },
            "24*32": { price: 60.00, quantity: 20 },
            "24*34": { price: 62.00, quantity: 20 }
        }
    },
    {
        id: 8,
        name: "Sports T-shirts",
        category: "sports",
        subcategory: "pre-primary",
        image: sports_t_shirt,
        sizes: {
            "18": { price: 30.00, quantity: 30 },
            "20": { price: 35.00, quantity: 80 },
            "22": { price: 40.00, quantity: 100 },
            "24": { price: 45.00, quantity: 100 },
            "26": { price: 50.00, quantity: 80 },
            "28": { price: 55.00, quantity: 40 }
        }
    },
    {
        id: 9,
        name: "Sports Shorts",
        category: "sports",
        subcategory: "pre-primary",
        image: sports_shorts,
        sizes: {
            "11": { price: 30.00, quantity: 30 },
            "12": { price: 35.00, quantity: 80 },
            "13": { price: 40.00, quantity: 100 },
            "14": { price: 45.00, quantity: 100 },
            "15": { price: 50.00, quantity: 80 },
            "16": { price: 55.00, quantity: 40 }
        }
    },
    {
        id: 10,
        name: "Sports T-shirts",
        category: "sports",
        subcategory: "primary",
        image: sports_t_shirt_2,
        sizes: {}
    },
    {
        id: 11,
        name: "Sports Trousers",
        category: "sports",
        subcategory: "primary",
        image: sports_trousers,
        sizes: {
            "3": { price: 40.00, quantity: 40 },
            "4": { price: 45.00, quantity: 120 },
            "5": { price: 50.00, quantity: 120 },
            "6": { price: 55.00, quantity: 80 },
            "7": { price: 60.00, quantity: 40 }
        }
    },
    {
        id: 12,
        name: "Sports T-shirts (Yellow)",
        category: "sports",
        subcategory: "color",
        image: sports_t_shirt_2,
        sizes: {
            "3": { price: 10.00, quantity: 10 },
            "4": { price: 15.00, quantity: 30 },
            "5": { price: 20.00, quantity: 30 },
            "6": { price: 25.00, quantity: 20 },
            "7": { price: 30.00, quantity: 10 }
        }
    },
    {
        id: 13,
        name: "Sports T-shirts (Red)",
        category: "sports",
        subcategory: "color",
        image: sports_t_shirt_2,
        sizes: {
            "3": { price: 10.00, quantity: 10 },
            "4": { price: 15.00, quantity: 30 },
            "5": { price: 20.00, quantity: 30 },
            "6": { price: 25.00, quantity: 20 },
            "7": { price: 30.00, quantity: 10 }
        }
    },
    {
        id: 14,
        name: "Sports T-shirts (Green)",
        category: "sports",
        subcategory: "color",
        image: sports_t_shirt_2,
        sizes: {
            "3": { price: 10.00, quantity: 10 },
            "4": { price: 15.00, quantity: 30 },
            "5": { price: 20.00, quantity: 30 },
            "6": { price: 25.00, quantity: 20 },
            "7": { price: 30.00, quantity: 10 }
        }
    },
    {
        id: 15,
        name: "Sports T-shirts (Blue)",
        category: "sports",
        subcategory: "color",
        image: sports_t_shirt_2,
        sizes: {
            "3": { price: 10.00, quantity: 10 },
            "4": { price: 15.00, quantity: 30 },
            "5": { price: 20.00, quantity: 30 },
            "6": { price: 25.00, quantity: 20 },
            "7": { price: 30.00, quantity: 10 }
        }
    }
];

export default main_data;
