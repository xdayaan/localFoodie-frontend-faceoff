import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import RestaurantList from '../../components/RestaurantList/RestaurantList';
import { Restaurant } from '../../data/restaurant';

interface SearchPageProps {
  onSearch: (results: {
    searchTerm: string;
    cityId: string;
    cuisineType: string;
    priceRange: [number, number];
    restaurants: Restaurant[];
  }) => void;
  searchResults: {
    searchTerm: string;
    cityId: string;
    cuisineType: string;
    priceRange: [number, number];
    restaurants: Restaurant[];
  } | null;
  onSelectRestaurant: (restaurantId: string) => void;
  onGoBack: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ({
  onSearch,
  searchResults,
  onSelectRestaurant,
  onGoBack
}) => {
  const getSearchResultsTitle = () => {
    if (!searchResults) return "Search Results";
    
    const { searchTerm, cityId } = searchResults;
    const count = searchResults.restaurants.length;
    
    if (count === 0) {
      return "No Restaurants Found";
    }
    
    let title = `Found ${count} Restaurant${count !== 1 ? 's' : ''}`;
    
    if (searchTerm) {
      title += ` for "${searchTerm}"`;
    }
    
    if (cityId && cityId !== 'all') {
      // Try to get a proper city name from the restaurant data
      const cityName = searchResults.restaurants[0]?.location.cityId.toUpperCase() || cityId;
      title += ` in ${cityName}`;
    }
    
    return title;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={onGoBack}
            className="flex items-center text-primary dark:text-primary-light hover:underline mb-4"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-3xl font-bold text-black dark:text-white">Search Restaurants</h1>
        </div>
        
        <div className="mb-8">
          <SearchBar onSearch={onSearch} />
        </div>
        
        {searchResults && (
          <RestaurantList
            restaurants={searchResults.restaurants}
            title={getSearchResultsTitle()}
            onSelectRestaurant={onSelectRestaurant}
          />
        )}
        
        {(!searchResults || searchResults.restaurants.length === 0) && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {searchResults ? "No restaurants found matching your criteria." : "Use the search bar above to find restaurants."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;