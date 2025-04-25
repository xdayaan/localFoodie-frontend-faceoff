import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Restaurant } from '../../data/restaurant';
import { FaStar, FaHeart, FaRegHeart, FaClock, FaDollarSign } from 'react-icons/fa';

interface RestaurantListProps {
  restaurants: Restaurant[];
  title?: string;
  onSelectRestaurant?: (restaurantId: string) => void;
}

type SortOption = 'rating' | 'price' | 'deliveryTime';

const RestaurantList: React.FC<RestaurantListProps> = ({ 
  restaurants, 
  title = "Restaurants", 
  onSelectRestaurant 
}) => {
  const [displayedRestaurants, setDisplayedRestaurants] = useState<Restaurant[]>(restaurants);
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [priceFilter, setPriceFilter] = useState<number[]>([1, 2, 3]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Apply sorting and filtering
  useEffect(() => {
    let filteredList = [...restaurants];

    // Apply price filter
    filteredList = filteredList.filter(restaurant => 
      priceFilter.includes(restaurant.priceLevel)
    );

    // Apply favorites filter
    if (showFavoritesOnly) {
      filteredList = filteredList.filter(restaurant => 
        favorites.includes(restaurant.id)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filteredList.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        filteredList.sort((a, b) => a.priceLevel - b.priceLevel);
        break;
      case 'deliveryTime':
        filteredList.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      default:
        break;
    }

    setDisplayedRestaurants(filteredList);
  }, [restaurants, sortBy, priceFilter, favorites, showFavoritesOnly]);

  const toggleFavorite = (e: React.MouseEvent, restaurantId: string) => {
    e.stopPropagation(); // Prevent triggering the card click
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(restaurantId)) {
        return prevFavorites.filter(id => id !== restaurantId);
      } else {
        return [...prevFavorites, restaurantId];
      }
    });
  };

  const togglePriceFilter = (level: number) => {
    setPriceFilter(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  // Generate price level indicators
  const renderPriceLevel = (level: number) => {
    return Array(level).fill(0).map((_, i) => (
      <FaDollarSign key={i} className="text-primary" />
    ));
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0 text-gray-800">{title}</h2>
          
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            {/* Sorting options */}
            <div className="flex items-center">
              <span className="mr-2 text-gray-800">Sort by:</span>
              <select 
                className="bg-white text-black border border-gray-300 rounded p-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="rating" className="text-black">Rating</option>
                <option value="price" className="text-black">Price (low to high)</option>
                <option value="deliveryTime" className="text-black">Delivery Time</option>
              </select>
            </div>
            
            {/* Price filter */}
            <div className="flex items-center gap-2">
              <span className="text-gray-800">Price:</span>
              {[1, 2, 3].map(level => (
                <button
                  key={level}
                  className={`px-3 py-1 rounded-full border ${
                    priceFilter.includes(level) 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-black border-gray-300'
                  }`}
                  onClick={() => togglePriceFilter(level)}
                >
                  {Array(level).fill('$').join('')}
                </button>
              ))}
            </div>
            
            {/* Favorites filter */}
            <button
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                showFavoritesOnly
                  ? 'bg-primary text-white'
                  : 'bg-white text-black border border-gray-300'
              }`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              {showFavoritesOnly ? <FaHeart /> : <FaRegHeart />}
              <span>Favorites</span>
            </button>
          </div>
        </div>
        
        {displayedRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No restaurants found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {displayedRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer h-full"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => onSelectRestaurant && onSelectRestaurant(restaurant.id)}
                >
                  <div className="relative">
                    {/* Restaurant image */}
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${restaurant.image})` }}
                    />
                    
                    {/* Favorite button */}
                    <button
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
                      onClick={(e) => toggleFavorite(e, restaurant.id)}
                    >
                      {favorites.includes(restaurant.id) ? (
                        <FaHeart className="text-red-500" size={18} />
                      ) : (
                        <FaRegHeart className="text-gray-400" size={18} />
                      )}
                    </button>
                    
                    {/* Price level and cuisine badge */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-white text-gray-800 px-2 py-1 rounded text-sm font-medium flex items-center shadow-sm">
                        {renderPriceLevel(restaurant.priceLevel)}
                      </span>
                      <span className="bg-primary text-white px-2 py-1 rounded text-sm font-medium shadow-sm">
                        {restaurant.cuisineId.charAt(0).toUpperCase() + restaurant.cuisineId.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-gray-700">{restaurant.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {restaurant.description}
                    </p>
                    
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      <span className="mr-4">{restaurant.deliveryTime} min</span>
                      <span>{restaurant.location.address.split(',')[0]}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantList;