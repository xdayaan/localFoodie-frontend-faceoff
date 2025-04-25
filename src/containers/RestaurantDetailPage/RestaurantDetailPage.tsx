import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaClock, FaDollarSign, FaPhone, FaGlobe, FaMapMarkerAlt, FaFire, FaLeaf, FaHeart, FaShare, FaArrowLeft } from 'react-icons/fa';
import { Restaurant } from '../../data/restaurant';
import { getCityById } from '../../data/city';

interface RestaurantDetailPageProps {
  restaurant: Restaurant | null;
  onGoBack: () => void;
}

const RestaurantDetailPage: React.FC<RestaurantDetailPageProps> = ({
  restaurant,
  onGoBack
}) => {
  const [activeTab, setActiveTab] = useState('menu');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-white rounded-lg shadow-lg text-center"
        >
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
          </svg>
          <p className="text-xl text-gray-600">Restaurant not found</p>
          <button 
            onClick={onGoBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const city = getCityById(restaurant.location.cityId);

  // Group food items by category
  const categories = restaurant.foodItems.reduce((acc, item) => {
    // Create a default category based on whether it's vegetarian, popular, or a default "Other"
    const category = item.vegetarian ? "Vegetarian" : (item.popular ? "Popular" : "Other");
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof restaurant.foodItems>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Header (appears on scroll) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-3 px-4"
          >
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  onClick={onGoBack}
                  className="mr-3 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <FaArrowLeft />
                </button>
                <h2 className="font-semibold text-lg truncate max-w-xs">{restaurant.name}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                  <FaStar className="mr-1" /> {restaurant.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onGoBack}
          className="flex items-center text-gray-600 hover:text-blue-500 transition-colors mb-4"
        >
          <FaArrowLeft className="mr-1" />
          <span className="font-medium">Back to Search Results</span>
        </motion.button>

        {/* Restaurant Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="h-72 sm:h-80 md:h-96 w-full bg-cover bg-center">
            <img 
              src={restaurant.image} 
              alt={restaurant.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-shadow">{restaurant.name}</h1>
                <div className="flex items-center flex-wrap mb-2 gap-y-2">
                  <span className="flex items-center bg-yellow-400/90 text-white px-2 py-1 rounded-full text-sm font-bold mr-3">
                    <FaStar className="mr-1" />
                    <span>{restaurant.rating.toFixed(1)}</span>
                  </span>
                  
                  <span className="mr-3 flex items-center">
                    {Array(restaurant.priceLevel).fill(0).map((_, i) => (
                      <FaDollarSign key={i} className="text-white" />
                    ))}
                  </span>
                  
                  <span className="flex items-center bg-gray-700/80 text-white px-2 py-1 rounded-full text-sm mr-3">
                    <FaClock className="mr-1" />
                    <span>{restaurant.deliveryTime} min</span>
                  </span>
                  
                  <span className="bg-blue-500/90 text-white px-2 py-1 rounded-full text-sm font-medium mr-3">
                    {restaurant.cuisineId.charAt(0).toUpperCase() + restaurant.cuisineId.slice(1)}
                  </span>
                  
                  <span className="flex items-center bg-gray-700/80 text-white px-2 py-1 rounded-full text-sm">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{city ? city.name : restaurant.location.cityId}</span>
                  </span>
                </div>
              </div>
              
              <div className="hidden sm:flex space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-red-500 p-2 rounded-full"
                >
                  <FaHeart />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-500 p-2 rounded-full"
                >
                  <FaShare />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex overflow-x-auto scrollbar-hide">
            {['menu', 'about', 'reviews', 'photos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium text-sm sm:text-base capitalize whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-blue-500 border-b-2 border-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Menu or About Content */}
          <div className="lg:col-span-2">
            {activeTab === 'menu' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Menu</h2>
                
                {Object.entries(categories).map(([category, items], categoryIndex) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: index * 0.05 + categoryIndex * 0.1 } 
                          }}
                          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                          onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                          className={`bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer transition-all ${
                            selectedItem === item.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/3">
                              <div className="h-32 sm:h-full relative">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                                
                                {/* Badges */}
                                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                                  {item.popular && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                      <FaFire className="mr-1" /> Popular
                                    </span>
                                  )}
                                  
                                  {item.vegetarian && (
                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                      <FaLeaf className="mr-1" /> Veg
                                    </span>
                                  )}
                                </div>

                                {item.spicyLevel && item.spicyLevel > 0 && (
                                  <div className="absolute top-2 right-2">
                                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                      {Array(item.spicyLevel).fill('🌶️').join('')}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="text-base font-medium text-gray-800">{item.name}</h4>
                                  <span className="ml-2 text-blue-600 font-bold">${item.price.toFixed(2)}</span>
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                              </div>
                              
                              <AnimatePresence>
                                {selectedItem === item.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 pt-3 border-t border-gray-100"
                                  >
                                    <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium">
                                      Add to Cart
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">About {restaurant.name}</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                  <p className="text-gray-600">{restaurant.description}</p>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Opening Hours</h3>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(restaurant.openingHours).map(([day, hours], index) => (
                      <motion.div 
                        key={day} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.05 } 
                        }}
                        className="flex justify-between py-2 px-3 rounded-lg hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-700">{day}</span>
                        <span className="text-gray-500">{hours}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Reviews coming soon</h3>
                  <p className="text-gray-500">Be the first to leave a review!</p>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'photos' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Photo gallery coming soon</h3>
                  <p className="text-gray-500">We're collecting beautiful photos of this place!</p>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right Column: Contact & Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact & Location</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <FaPhone className="text-blue-500" />
                  </div>
                  <span className="text-gray-700">{restaurant.phoneNumber}</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <FaGlobe className="text-blue-500" />
                  </div>
                  <a 
                    href={restaurant.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3 mt-1">
                    <FaMapMarkerAlt className="text-blue-500" />
                  </div>
                  <span className="text-gray-700">{restaurant.location.address}</span>
                </div>
              </div>
              
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500 text-sm">Map location would be displayed here</span>
              </div>
              
              <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium">
                Get Directions
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">Open now: {restaurant.openingHours["Today"] || "9:00 AM - 9:00 PM"}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mobile Action Buttons */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white shadow-up py-3 px-4 md:hidden"
      >
        <div className="flex justify-between">
          <button className="flex-1 mr-2 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg">
            <FaHeart className="mx-auto" />
          </button>
          <button className="flex-1 ml-2 py-2 bg-blue-500 text-white rounded-lg font-medium">
            Order Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Add this to your global CSS
/*
.text-shadow {
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.shadow-up {
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
*/

export default RestaurantDetailPage;