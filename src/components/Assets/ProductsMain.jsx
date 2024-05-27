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
      price: 50.00,
      sizes: 
        {
          "1": 30,
          "2":80,
          "3":100,
          "4":120,
          "5":60
        }
      
    },
    {
      id: 2,
      name: "Shorts",
      category: "boys",
      subcategory: "pre-primary",
      image: mens_shorts,
      price: 85.00,
      sizes:{
        "11": 40,
        "12":80,
        "13":80,
        "14":100,
        "15":100
      }
    },
    {
      id: 3,
      name: "Frock",
      category: "girls",
      subcategory: "pre-primary",
      image: womens_t_shirt,
      price: 60.00,
      sizes:{
        "1": 30,
        "2":60,
        "3":100,
        "4":100,
        "5":80,
        "6":60
      }
    },
    {
      id: 4,
      name: "T-shirts",
      category: "boys",
      subcategory: "primary",
      image: mens_t_shirt_2,
      price: 150.00,
      sizes:{
        "4": 40,
        "5":100,
        "6":120,
        "7":80,
        "8":40
      }
    },
    {
      id: 5,
      name: "Shorts",
      category: "boys",
      subcategory: "primary",
      image: mens_shorts_2,
      price: 185.00,
      sizes:{
        "16": 100,
        "17":80,
        "18":80,
        "19":30,
        "20":30
      }
    },
    {
      id: 6,
      name: "T-shirts",
      category: "girls",
      subcategory: "primary",
      image: womens_t_shirt_2,
      price: 160.00,
      sizes:{
        "3": 40,
        "4":120,
        "5":120,
        "6":80,
        "7":40
      }
    },
    {
      id: 7,
      name: "Shorts",
      category: "girls",
      subcategory: "primary",
      image: womens_shorts_2,
      price: 200.00,
      sizes : {
     
        "17*26": 20,
        "17*28": 20,
        "18*24": 20,
        "18*26": 20,
        "18*28": 20,
        "19*24": 20,
        "19*26": 20,
        "19*28": 20,
        "20*24": 20,
        "20*26": 20,
        "20*28": 20,
        "21*28": 20,
        "21*30": 20,
        "22*28": 20,
        "22*30": 20,
        "22*32": 20,
        "23*30": 20,
        "23*32": 20,
        "23*34": 20,
        "24*30": 20,
        "24*32": 20,
        "24*34": 20
      }
    
    },

    {
      id: 8,
      name: "Sports T-shirts",
      category: "sports",
      subcategory: "pre-primary",
      image: sports_t_shirt,
      price: 100.00,
      sizes:{
        "18":30,
        "20":80,
        "22":100,
        "24":100,
        "26":80,
        "28":40
      }
    },

    {
      id: 9,
      name: "Sports Shorts",
      category: "sports",
      subcategory: "pre-primary",
      image: sports_shorts,
      price: 200.00,
      sizes:{
        "11":30,
        "12":80,
        "13":100,
        "14":100,
        "15":80,
        "16":40
      }
    },
    {
      id: 10,
      name: "Sports T-shirts",
      category: "sports",
      subcategory: "primary",
      image: sports_t_shirt_2,
      price: 160.00,
    },
    {
      id: 11,
      name: "Sports Trousers",
      category: "sports",
      subcategory: "primary",
      image: sports_trousers,
      price: 200.00,
      sizes:{
        "3":40,
        "4":120,
        "5":120,
        "6":80,
        "7":40

      }
    },
    {
      id: 12,
      name: "Sports T-shirts (Yellow)",
      category: "sports",
      subcategory: "color",
      image: sports_t_shirt_2,
      price: 160.00,
      sizes:{
        "3":10,
        "4":30,
        "5":30,
        "6":20,
        "7":10

      }
    },
    {
      id: 13,
      name: "Sports T-shirts (Red)",
      category: "sports",
      subcategory: "color",
      image: sports_t_shirt_2,
      price: 160.00,
      sizes:{
        "3":10,
        "4":30,
        "5":30,
        "6":20,
        "7":10

      }
    },
    {
      id: 14,
      name: "Sports T-shirts (Green)",
      category: "sports",
      subcategory: "color",
      image: sports_t_shirt_2,
      price: 160.00,
      sizes:{
        "3":10,
        "4":30,
        "5":30,
        "6":20,
        "7":10

      }
    },
    {
      id: 15,
      name: "Sports T-shirts (Blue)",
      category: "sports",
      subcategory: "color",
      image: sports_t_shirt_2,
      price: 160.00,
      sizes:{
        "3":10,
        "4":30,
        "5":30,
        "6":20,
        "7":10

      }
    },
  ];
  
  export default main_data;
  