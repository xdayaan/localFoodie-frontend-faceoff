import { Cuisine } from './cuisine';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular: boolean;
  spicyLevel?: number; // 0-3, where 0 is not spicy, 3 is very spicy
  vegetarian: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: {
    cityId: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  cuisineId: string;
  rating: number; // 1-5
  priceLevel: number; // 1-3, where 1 is cheap, 3 is expensive
  deliveryTime: number; // in minutes
  image: string;
  phoneNumber: string;
  website: string;
  openingHours: {
    [key: string]: string; // day: hours (e.g., "Monday": "9:00 AM - 10:00 PM")
  };
  foodItems: FoodItem[];
  featured: boolean;
}

const restaurants: Restaurant[] = [
  {
    id: "dragons-palace",
    name: "Dragon's Palace",
    description: "Authentic Chinese cuisine with a modern twist, serving dim sum and Sichuan specialties.",
    location: {
      cityId: "nyc",
      address: "234 Canal Street, Chinatown, New York, NY 10013",
      latitude: 40.7170,
      longitude: -73.9986
    },
    cuisineId: "chinese",
    rating: 4.7,
    priceLevel: 2,
    deliveryTime: 35,
    image: "https://images.unsplash.com/photo-1623042513081-3b44ac6c882f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbmVzZSUyMHJlc3Ryb3xlbnwwfHwwfHx8MA%3D%3D",
    phoneNumber: "+1 (212) 555-1234",
    website: "https://dragonspalace.example.com",
    openingHours: {
      "Monday": "11:00 AM - 10:00 PM",
      "Tuesday": "11:00 AM - 10:00 PM",
      "Wednesday": "11:00 AM - 10:00 PM",
      "Thursday": "11:00 AM - 10:00 PM",
      "Friday": "11:00 AM - 11:00 PM",
      "Saturday": "11:00 AM - 11:00 PM",
      "Sunday": "12:00 PM - 9:00 PM"
    },
    foodItems: [
      {
        id: "dim-sum-platter",
        name: "Dim Sum Platter",
        description: "Assortment of steamed dumplings including har gow, siu mai, and rice noodle rolls.",
        price: 18.99,
        image: "http://plus.unsplash.com/premium_photo-1661431423340-fa30b97312bc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RlYW1lZCUyMGR1bXBsaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
        popular: true,
        vegetarian: false
      },
      {
        id: "kung-pao-chicken",
        name: "Kung Pao Chicken",
        description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1706145779556-f2c642db2699?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        popular: true,
        spicyLevel: 2,
        vegetarian: false
      },
      {
        id: "mapo-tofu",
        name: "Mapo Tofu",
        description: "Soft tofu in a spicy sauce with minced pork and Sichuan peppercorns.",
        price: 14.50,
        image: "https://images.unsplash.com/photo-1706468238718-bba7e9b63ad2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFxcG8lMjB0b2Z1fGVufDB8fDB8fHww",
        popular: false,
        spicyLevel: 3,
        vegetarian: false
      }
    ],
    featured: true
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    description: "Exquisite North and South Indian cuisine offering a wide range of curries, biryanis, and tandoori specialties.",
    location: {
      cityId: "lon",
      address: "42 Brick Lane, Shoreditch, London, E1 6RF",
      latitude: 51.5203,
      longitude: -0.0720
    },
    cuisineId: "indian",
    rating: 4.5,
    priceLevel: 2,
    deliveryTime: 45,
    image: "https://images.unsplash.com/photo-1742281257687-092746ad6021?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    phoneNumber: "+44 20 7123 4567",
    website: "https://tajmahal-london.example.com",
    openingHours: {
      "Monday": "12:00 PM - 11:00 PM",
      "Tuesday": "12:00 PM - 11:00 PM",
      "Wednesday": "12:00 PM - 11:00 PM",
      "Thursday": "12:00 PM - 11:00 PM",
      "Friday": "12:00 PM - 12:00 AM",
      "Saturday": "12:00 PM - 12:00 AM",
      "Sunday": "12:00 PM - 10:00 PM"
    },
    foodItems: [
      {
        id: "butter-chicken",
        name: "Butter Chicken",
        description: "Tender chicken in a rich, creamy tomato sauce with butter and spices.",
        price: 16.99,
        image: "https://plus.unsplash.com/premium_photo-1661419883163-bb4df1c10109?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
        popular: true,
        spicyLevel: 1,
        vegetarian: false
      },
      {
        id: "vegetable-biryani",
        name: "Vegetable Biryani",
        description: "Fragrant basmati rice cooked with mixed vegetables, herbs, and aromatic spices.",
        price: 14.99,
        image: "https://plus.unsplash.com/premium_photo-1694141252883-39e9cfd511b3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        popular: true,
        spicyLevel: 1,
        vegetarian: true
      },
      {
        id: "garlic-naan",
        name: "Garlic Naan",
        description: "Soft, buttery flatbread topped with garlic and fresh herbs.",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1697155406014-04dc649b0953?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FybGljJTIwbmFhbnxlbnwwfHwwfHx8MA%3D%3D",
        popular: true,
        vegetarian: true
      }
    ],
    featured: true
  },
  {
    id: "mamma-mia",
    name: "Mamma Mia",
    description: "Family-owned Italian trattoria serving traditional pasta, wood-fired pizzas, and homemade gelato.",
    location: {
      cityId: "sf",
      address: "782 Union Street, North Beach, San Francisco, CA 94133",
      latitude: 37.8018,
      longitude: -122.4109
    },
    cuisineId: "italian",
    rating: 4.8,
    priceLevel: 2,
    deliveryTime: 30,
    image: "https://images.unsplash.com/photo-1699192676286-545f9e23ca25?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phoneNumber: "+1 (415) 555-7890",
    website: "https://mammamia-sf.example.com",
    openingHours: {
      "Monday": "11:30 AM - 10:00 PM",
      "Tuesday": "11:30 AM - 10:00 PM",
      "Wednesday": "11:30 AM - 10:00 PM",
      "Thursday": "11:30 AM - 10:00 PM",
      "Friday": "11:30 AM - 11:00 PM",
      "Saturday": "11:30 AM - 11:00 PM",
      "Sunday": "12:00 PM - 9:00 PM"
    },
    foodItems: [
      {
        id: "margherita-pizza",
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, fresh mozzarella, and basil on a thin, crispy crust.",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1595378833483-c995dbe4d74f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hcmdocml0YSUyMHBpenphfGVufDB8fDB8fHww",
        popular: true,
        vegetarian: true
      },
      {
        id: "spaghetti-carbonara",
        name: "Spaghetti Carbonara",
        description: "Al dente spaghetti with a creamy sauce of eggs, pancetta, parmesan cheese, and black pepper.",
        price: 16.50,
        image: "https://media.istockphoto.com/id/182890318/photo/a-fork-spindles-from-a-bowl-of-linguine-carbonara.webp?a=1&b=1&s=612x612&w=0&k=20&c=JG9MQ_p8o2DDpEr5v7xZyPesPHga6ygTiNQWYJbhc68=",
        popular: true,
        vegetarian: false
      },
      {
        id: "tiramisu",
        name: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1698688334089-c68105801d02?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        popular: true,
        vegetarian: true
      }
    ],
    featured: true
  },
  {
    id: "taqueria-el-sol",
    name: "Taqueria El Sol",
    description: "Vibrant Mexican street food restaurant known for authentic tacos, fresh guacamole, and strong margaritas.",
    location: {
      cityId: "la",
      address: "1234 Sunset Blvd, Echo Park, Los Angeles, CA 90026",
      latitude: 34.0762,
      longitude: -118.2607
    },
    cuisineId: "mexican",
    rating: 4.6,
    priceLevel: 1,
    deliveryTime: 25,
    image: "https://assets.cntraveller.in/photos/659e533cd11d49c5b40f42f7/4:3/w_2956,h_2217,c_limit/Mehico%20Interiors.jpg",
    phoneNumber: "+1 (323) 555-4321",
    website: "https://taqueriaelsol.example.com",
    openingHours: {
      "Monday": "10:00 AM - 10:00 PM",
      "Tuesday": "10:00 AM - 10:00 PM",
      "Wednesday": "10:00 AM - 10:00 PM",
      "Thursday": "10:00 AM - 10:00 PM",
      "Friday": "10:00 AM - 12:00 AM",
      "Saturday": "10:00 AM - 12:00 AM",
      "Sunday": "10:00 AM - 9:00 PM"
    },
    foodItems: [
      {
        id: "street-tacos",
        name: "Street Tacos",
        description: "Three corn tortillas filled with your choice of carne asada, al pastor, or chicken, topped with onions and cilantro.",
        price: 9.99,
        image: "https://www.thecookierookie.com/wp-content/uploads/2024/05/street-tacos-recipe-2.jpg",
        popular: true,
        vegetarian: false
      },
      {
        id: "guacamole-chips",
        name: "Guacamole & Chips",
        description: "Freshly made guacamole with ripe avocados, lime, cilantro, and tomatoes, served with crispy tortilla chips.",
        price: 7.99,
        image: "https://emilybites.com/2021/04/loaded-guacamole.html",
        popular: true,
        vegetarian: true
      },
      {
        id: "chile-relleno",
        name: "Chile Relleno",
        description: "Roasted poblano pepper stuffed with cheese, battered, fried, and topped with tomato sauce.",
        price: 12.99,
        image: "https://www.foodnetwork.com/recipes/chile-relleno-recipe-2014121",
        popular: false,
        spicyLevel: 1,
        vegetarian: true
      }
    ],
    featured: false
  },
  {
    id: "arabian-nights",
    name: "Arabian Nights",
    description: "Elegant Middle Eastern restaurant offering mezze platters, grilled meats, and traditional desserts in a lavish setting.",
    location: {
      cityId: "par",
      address: "17 Rue des Rosiers, Le Marais, Paris, 75004",
      latitude: 48.8566,
      longitude: 2.3522
    },
    cuisineId: "arabian",
    rating: 4.4,
    priceLevel: 3,
    deliveryTime: 50,
    image: "https://b.zmtcdn.com/data/pictures/9/20875099/5b83724042a761bb2140ba4d05e4f0cf.jpg?fit=around|960:500&crop=960:500;,",
    phoneNumber: "+33 1 42 72 XX XX",
    website: "https://arabian-nights-paris.example.com",
    openingHours: {
      "Monday": "6:00 PM - 11:00 PM",
      "Tuesday": "6:00 PM - 11:00 PM",
      "Wednesday": "6:00 PM - 11:00 PM",
      "Thursday": "6:00 PM - 11:00 PM",
      "Friday": "6:00 PM - 12:00 AM",
      "Saturday": "6:00 PM - 12:00 AM",
      "Sunday": "6:00 PM - 10:00 PM"
    },
    foodItems: [
      {
        id: "mezze-platter",
        name: "Mezze Platter",
        description: "Selection of hummus, baba ghanoush, tabbouleh, falafel, and warm pita bread.",
        price: 22.99,
        image: "https://falasteenifoodie.com/baba-ghanoush/",
        popular: true,
        vegetarian: true
      },
      {
        id: "lamb-shawarma",
        name: "Lamb Shawarma",
        description: "Thinly sliced marinated lamb, slow-roasted on a vertical spit, served with tahini sauce and pickles.",
        price: 18.99,
        image: "https://kristineskitchenblog.com/wp-content/uploads/2024/07/chicken-shawarma-06-3.jpg",
        popular: true,
        vegetarian: false
      },
      {
        id: "baklava",
        name: "Baklava",
        description: "Sweet pastry made of layers of filo filled with chopped nuts and sweetened with honey or syrup.",
        price: 8.99,
        image: "https://cleobuttera.com/wp-content/uploads/2018/03/lifted-baklava-720x720.jpg",
        popular: true,
        vegetarian: true
      }
    ],
    featured: true
  },
  {
    id: "golden-wok",
    name: "Golden Wok",
    description: "Fast and flavorful Chinese cuisine specializing in wok-fried dishes and hand-pulled noodles.",
    location: {
      cityId: "chi",
      address: "2131 S Archer Ave, Chinatown, Chicago, IL 60616",
      latitude: 41.8539,
      longitude: -87.6338
    },
    cuisineId: "chinese",
    rating: 4.3,
    priceLevel: 1,
    deliveryTime: 30,
    image: "https://hokkaidoguide.com/qingdao-chinese-restaurant/",
    phoneNumber: "+1 (312) 555-6789",
    website: "https://golden-wok-chicago.example.com",
    openingHours: {
      "Monday": "11:00 AM - 10:00 PM",
      "Tuesday": "11:00 AM - 10:00 PM",
      "Wednesday": "11:00 AM - 10:00 PM",
      "Thursday": "11:00 AM - 10:00 PM",
      "Friday": "11:00 AM - 11:00 PM",
      "Saturday": "11:00 AM - 11:00 PM",
      "Sunday": "12:00 PM - 9:30 PM"
    },
    foodItems: [
      {
        id: "hand-pulled-noodles",
        name: "Hand-Pulled Noodles with Beef",
        description: "Fresh hand-pulled noodles stir-fried with tender beef slices and vegetables in a savory sauce.",
        price: 13.99,
        image: "/images/food/hand-pulled-noodles.jpg",
        popular: true,
        vegetarian: false
      },
      {
        id: "general-tso-chicken",
        name: "General Tso's Chicken",
        description: "Crispy chicken pieces tossed in a sweet and spicy sauce, served with steamed rice.",
        price: 14.50,
        image: "/images/food/general-tso-chicken.jpg",
        popular: true,
        spicyLevel: 2,
        vegetarian: false
      },
      {
        id: "vegetable-spring-rolls",
        name: "Vegetable Spring Rolls",
        description: "Crispy spring rolls filled with cabbage, carrots, and mushrooms, served with sweet chili sauce.",
        price: 6.99,
        image: "/images/food/vegetable-spring-rolls.jpg",
        popular: false,
        vegetarian: true
      }
    ],
    featured: false
  },
  {
    id: "spice-route",
    name: "Spice Route",
    description: "Modern Indian fusion restaurant blending traditional recipes with contemporary culinary techniques.",
    location: {
      cityId: "tok",
      address: "3-5-8 Roppongi, Minato City, Tokyo, 106-0032",
      latitude: 35.6631,
      longitude: 139.7411
    },
    cuisineId: "indian",
    rating: 4.6,
    priceLevel: 3,
    deliveryTime: 40,
    image: "/images/restaurants/spice-route.jpg",
    phoneNumber: "+81 3-XXXX-XXXX",
    website: "https://spice-route-tokyo.example.com",
    openingHours: {
      "Monday": "11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM",
      "Tuesday": "11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM",
      "Wednesday": "11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM",
      "Thursday": "11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM",
      "Friday": "11:30 AM - 2:30 PM, 5:30 PM - 10:30 PM",
      "Saturday": "11:30 AM - 2:30 PM, 5:30 PM - 10:30 PM",
      "Sunday": "11:30 AM - 2:30 PM, 5:30 PM - 9:00 PM"
    },
    foodItems: [
      {
        id: "lamb-vindaloo",
        name: "Lamb Vindaloo",
        description: "Spicy curry from Goa with tender pieces of lamb in a fiery sauce made with red chilies and vinegar.",
        price: 18.99,
        image: "/images/food/lamb-vindaloo.jpg",
        popular: true,
        spicyLevel: 3,
        vegetarian: false
      },
      {
        id: "palak-paneer",
        name: "Palak Paneer",
        description: "Fresh spinach puree with cubes of homemade cheese, spiced with ginger and garam masala.",
        price: 15.99,
        image: "/images/food/palak-paneer.jpg",
        popular: true,
        spicyLevel: 1,
        vegetarian: true
      },
      {
        id: "mango-lassi",
        name: "Mango Lassi",
        description: "Refreshing yogurt drink blended with ripe mangoes, a touch of cardamom, and honey.",
        price: 4.99,
        image: "/images/food/mango-lassi.jpg",
        popular: true,
        vegetarian: true
      }
    ],
    featured: false
  },
  {
    id: "little-italy",
    name: "Little Italy",
    description: "Cozy trattoria serving authentic Italian comfort food made with imported ingredients and family recipes.",
    location: {
      cityId: "mia",
      address: "2250 NW 2nd Ave, Wynwood, Miami, FL 33127",
      latitude: 25.7989,
      longitude: -80.1995
    },
    cuisineId: "italian",
    rating: 4.5,
    priceLevel: 2,
    deliveryTime: 35,
    image: "/images/restaurants/little-italy.jpg",
    phoneNumber: "+1 (305) 555-9876",
    website: "https://little-italy-miami.example.com",
    openingHours: {
      "Monday": "12:00 PM - 10:00 PM",
      "Tuesday": "12:00 PM - 10:00 PM",
      "Wednesday": "12:00 PM - 10:00 PM",
      "Thursday": "12:00 PM - 10:00 PM",
      "Friday": "12:00 PM - 11:30 PM",
      "Saturday": "12:00 PM - 11:30 PM",
      "Sunday": "12:00 PM - 10:00 PM"
    },
    foodItems: [
      {
        id: "lasagna",
        name: "Lasagna alla Bolognese",
        description: "Layers of pasta, rich meat sauce, béchamel, and three kinds of cheese, baked to perfection.",
        price: 17.99,
        image: "/images/food/lasagna.jpg",
        popular: true,
        vegetarian: false
      },
      {
        id: "risotto-funghi",
        name: "Risotto ai Funghi",
        description: "Creamy Arborio rice cooked with porcini and wild mushrooms, white wine, and finished with parmesan.",
        price: 16.50,
        image: "/images/food/risotto-funghi.jpg",
        popular: true,
        vegetarian: true
      },
      {
        id: "caprese-salad",
        name: "Insalata Caprese",
        description: "Fresh buffalo mozzarella, heirloom tomatoes, and basil, drizzled with extra virgin olive oil and balsamic glaze.",
        price: 10.99,
        image: "/images/food/caprese-salad.jpg",
        popular: false,
        vegetarian: true
      }
    ],
    featured: false
  }
];

export const getFeaturedRestaurants = (): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.featured);
};

export const getAllRestaurants = (): Restaurant[] => {
  return restaurants;
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getRestaurantsByCuisine = (cuisineId: string): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.cuisineId === cuisineId);
};

export const getRestaurantsByCity = (cityId: string): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.location.cityId === cityId);
};

export const sortRestaurantsByRating = (restaurants: Restaurant[]): Restaurant[] => {
  return [...restaurants].sort((a, b) => b.rating - a.rating);
};

export const sortRestaurantsByPrice = (restaurants: Restaurant[], ascending = true): Restaurant[] => {
  return [...restaurants].sort((a, b) => 
    ascending ? a.priceLevel - b.priceLevel : b.priceLevel - a.priceLevel
  );
};

export const sortRestaurantsByDeliveryTime = (restaurants: Restaurant[]): Restaurant[] => {
  return [...restaurants].sort((a, b) => a.deliveryTime - b.deliveryTime);
};

export default restaurants;