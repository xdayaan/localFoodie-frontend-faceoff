import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaUtensils, FaTimes, FaClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { getPopularCities, getAllCities, City } from '../../data/city';
import { getAllRestaurants, Restaurant, FoodItem } from '../../data/restaurant';
import { getAllCuisines, Cuisine } from '../../data/cuisine';

interface SearchBarProps {
  onSearch?: (results: {
    searchTerm: string;
    cityId: string;
    cuisineType: string;
    priceRange: [number, number];
    restaurants: Restaurant[];
  }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<City | null>(null);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [nonSpicyOnly, setNonSpicyOnly] = useState(false);
  const [fastDeliveryOnly, setFastDeliveryOnly] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    restaurants: Restaurant[];
    foodItems: {restaurant: Restaurant, item: FoodItem}[];
  }>({ restaurants: [], foodItems: [] });
  const locationRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const allCities: City = {
    id: "all",
    name: "All Cities",
    state: "",
    country: "",
    popular: true,
  };

  useEffect(() => {
    // Load all cities and add "All Cities" option at the top
    const cityList = getAllCities();
    setCities([allCities, ...cityList]);
    
    // Load cuisines
    setCuisines(getAllCuisines());
    
    // Close dropdowns when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      
      if (filterRef.current && !filterRef.current.contains(event.target as Node) && 
          !event.composedPath().some(el => (el as HTMLElement)?.classList?.contains('filter-toggle'))) {
        setShowFilters(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate suggestions as user types
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const allRestaurants = getAllRestaurants();
      const term = searchTerm.toLowerCase();
      
      // Filter restaurants by name
      const matchingRestaurants = allRestaurants
        .filter(restaurant => restaurant.name.toLowerCase().includes(term))
        .slice(0, 3); // Limit to 3 restaurants
      
      // Filter food items by name
      const matchingFoodItems = allRestaurants.flatMap(restaurant => 
        restaurant.foodItems
          .filter(item => item.name.toLowerCase().includes(term))
          .map(item => ({ restaurant, item }))
      ).slice(0, 4); // Limit to 4 food items
      
      setSuggestions({
        restaurants: matchingRestaurants,
        foodItems: matchingFoodItems
      });
      setShowSuggestions(matchingRestaurants.length > 0 || matchingFoodItems.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    // Get all restaurants
    const allRestaurants = getAllRestaurants();
    
    // Filter restaurants based on search criteria
    let filteredRestaurants = allRestaurants;
    
    // Filter by city if a specific city is selected (not "All Cities")
    if (selectedLocation && selectedLocation.id !== 'all') {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.location.cityId === selectedLocation.id
      );
    }
    
    // Filter by cuisine type if selected
    if (selectedCuisine) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.cuisineId === selectedCuisine
      );
    }
    
    // Filter by price range
    filteredRestaurants = filteredRestaurants.filter(restaurant => {
      // Convert restaurant price level (1-3) to a price in dollars
      const avgPrice = restaurant.foodItems.reduce((sum, item) => sum + item.price, 0) / restaurant.foodItems.length;
      return avgPrice >= priceRange[0] && avgPrice <= priceRange[1];
    });
    
    // Apply dietary and delivery filters
    if (vegetarianOnly) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.foodItems.some(item => item.vegetarian)
      );
    }
    
    if (nonSpicyOnly) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.foodItems.every(item => !item.spicyLevel || item.spicyLevel === 0)
      );
    }
    
    if (fastDeliveryOnly) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.deliveryTime <= 30
      );
    }
    
    // Filter by search term (match against restaurant name, description, or food items)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredRestaurants = filteredRestaurants.filter(restaurant => {
        // Check if search term matches restaurant name or description
        if (
          restaurant.name.toLowerCase().includes(term) || 
          restaurant.description.toLowerCase().includes(term)
        ) {
          return true;
        }
        
        // Check if search term matches any food item name or description
        return restaurant.foodItems.some(
          item => item.name.toLowerCase().includes(term) || 
                 item.description.toLowerCase().includes(term)
        );
      });
    }
    
    // Call the onSearch callback with the search results
    if (onSearch) {
      onSearch({
        searchTerm,
        cityId: selectedLocation?.id || 'all',
        cuisineType: selectedCuisine,
        priceRange,
        restaurants: filteredRestaurants
      });
    } else {
      console.log('Search results:', {
        searchTerm,
        cityId: selectedLocation?.id || 'all',
        cuisineType: selectedCuisine,
        priceRange,
        restaurantsCount: filteredRestaurants.length
      });
    }
    
    // Hide suggestions after search
    setShowSuggestions(false);
  };

  const selectLocation = (city: City) => {
    setSelectedLocation(city);
    setShowLocationDropdown(false);
  };

  const clearLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLocation(allCities); // Set to "All Cities" instead of null
  };

  const handlePriceRangeChange = (index: 0 | 1, value: string) => {
    const numValue = parseFloat(value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = isNaN(numValue) ? (index === 0 ? 0 : 100) : numValue;
    setPriceRange(newRange);
  };

  const selectSuggestion = (term: string) => {
    setSearchTerm(term);
    setShowSuggestions(false);
    // Small delay to allow the search term to update before searching
    setTimeout(() => handleSearch(), 10);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        className="relative flex flex-col md:flex-row items-center w-full gap-2 md:gap-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Search input */}
        <div ref={searchRef} className="relative flex-grow w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-sm shadow-sm"
            placeholder="Search for restaurants, cuisines, dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              if (searchTerm.length >= 2 && 
                  (suggestions.restaurants.length > 0 || suggestions.foodItems.length > 0)) {
                setShowSuggestions(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
                setShowSuggestions(false);
              }
            }}
          />
          {searchTerm && (
            <button 
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm('')}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          )}
          
          {/* Suggestions dropdown */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className="max-h-72 overflow-y-auto">
                  {suggestions.restaurants.length > 0 && (
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                      Restaurants
                    </div>
                  )}
                  {suggestions.restaurants.map(restaurant => (
                    <motion.div
                      key={`restaurant-${restaurant.id}`}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                      onClick={() => selectSuggestion(restaurant.name)}
                      whileHover={{ x: 5 }}
                    >
                      <FaUtensils className="mr-2 text-green-600" size={14} />
                      <div>
                        <div className="text-gray-800 font-medium">{restaurant.name}</div>
                        <div className="text-xs text-gray-500">{restaurant.location.address}</div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {suggestions.foodItems.length > 0 && (
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                      Food Items
                    </div>
                  )}
                  {suggestions.foodItems.map((item, index) => (
                    <motion.div
                      key={`food-${item.restaurant.id}-${item.item.id}`}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => selectSuggestion(item.item.name)}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        <div>
                          <div className="text-gray-800">{item.item.name}</div>
                          <div className="text-xs text-gray-500">at {item.restaurant.name}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Location selector */}
        <div ref={locationRef} className="relative w-full md:w-auto md:ml-2">
          <div 
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="cursor-pointer flex items-center justify-between w-full md:w-48 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm shadow-sm hover:border-green-500 transition-colors"
          >
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-green-600" />
              {selectedLocation ? (
                <div className="flex items-center">
                  <span className="truncate">{selectedLocation.name}</span>
                  {selectedLocation.id !== 'all' && (
                    <button 
                      onClick={clearLocation}
                      className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      ×
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-gray-500">All Cities</span>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showLocationDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="max-h-60 overflow-y-auto">
                  {cities.map((city) => (
                    <motion.div
                      key={city.id}
                      className={`px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-gray-800 ${
                        selectedLocation?.id === city.id ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => selectLocation(city)}
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-2">{city.name}</span>
                      {city.id !== 'all' && (
                        <span className="text-xs text-gray-500">
                          {city.state} {city.country}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className='flex'>
          {/* Search button */}
        <motion.button
          type="button"
          className="w-80 md:w-32 mr-4 md:w-auto md:ml-2 px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 shadow-sm"
          onClick={handleSearch}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Search
        </motion.button>

        {/* Filter button */}
        <motion.button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="filter-toggle md:ml-2 p-3 text-gray-700 hover:text-green-600 focus:outline-none bg-white border border-gray-300 rounded-lg shadow-sm hover:border-green-500 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle filters"
        >
          <FaFilter className="h-5 w-5" />
        </motion.button>
        </div>
      </motion.div>
      
      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            ref={filterRef}
            className="mt-2 p-4 bg-white shadow-lg rounded-lg border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800">Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cuisine filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800 mb-1">Cuisine Type</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUtensils className="h-4 w-4 text-gray-400" />
                  </div>
                  <select 
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                  >
                    <option value="">All Cuisines</option>
                    {cuisines.map(cuisine => (
                      <option key={cuisine.id} value={cuisine.id}>
                        {cuisine.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Price Range filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800 mb-1">Price Range ($)</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-1/2 border border-gray-300 rounded-md py-2 px-3 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={priceRange[0] || ''}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    min="0"
                  />
                  <span className="text-gray-800">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-1/2 border border-gray-300 rounded-md py-2 px-3 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    value={priceRange[1] || ''}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    min={priceRange[0]}
                  />
                </div>
              </div>
              
              {/* Dietary Preferences */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-800 mb-2">Quick Filters</label>
                <div className="flex flex-wrap gap-4">
                  <motion.label 
                    className={`inline-flex items-center p-2 border rounded-md cursor-pointer ${
                      vegetarianOnly 
                      ? 'bg-green-50 border-green-500 text-green-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-4 w-4 text-green-600 mr-2"
                      checked={vegetarianOnly}
                      onChange={() => setVegetarianOnly(!vegetarianOnly)}
                    />
                    <span className="text-sm">Vegetarian Options</span>
                  </motion.label>
                  
                  <motion.label 
                    className={`inline-flex items-center p-2 border rounded-md cursor-pointer ${
                      nonSpicyOnly 
                      ? 'bg-green-50 border-green-500 text-green-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-4 w-4 text-green-600 mr-2"
                      checked={nonSpicyOnly}
                      onChange={() => setNonSpicyOnly(!nonSpicyOnly)}
                    />
                    <span className="text-sm">Non-Spicy</span>
                  </motion.label>
                  
                  <motion.label 
                    className={`inline-flex items-center p-2 border rounded-md cursor-pointer ${
                      fastDeliveryOnly 
                      ? 'bg-green-50 border-green-500 text-green-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-4 w-4 text-green-600 mr-2"
                        checked={fastDeliveryOnly}
                        onChange={() => setFastDeliveryOnly(!fastDeliveryOnly)}
                      />
                      <span className="text-sm flex items-center">
                        <FaClock className="mr-1 h-3 w-3" /> Fast Delivery (≤30 min)
                      </span>
                    </div>
                  </motion.label>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <motion.button
                type="button"
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white hover:bg-gray-50"
                onClick={() => {
                  // Reset filters to default values
                  setSelectedCuisine('');
                  setPriceRange([0, 100]);
                  setVegetarianOnly(false);
                  setNonSpicyOnly(false);
                  setFastDeliveryOnly(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Reset
              </motion.button>
              <motion.button
                type="button"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                onClick={() => {
                  handleSearch();
                  setShowFilters(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}