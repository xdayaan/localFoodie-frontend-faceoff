import { useState, useEffect } from 'react'
import './App.css'
import './theme.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import CuisineCategory from './components/CuisineCategory/CuisineCategory'
import RestaurantList from './components/RestaurantList/RestaurantList'
import Footer from './components/Footer/Footer'
import { getAllCuisines } from './data/cuisine'
import { getRestaurantsByCuisine, getFeaturedRestaurants, getRestaurantById, Restaurant } from './data/restaurant'
import SearchPage from './containers/SearchPage/SearchPage'
import RestaurantDetailPage from './containers/RestaurantDetailPage/RestaurantDetailPage'

// Define app view types for navigation
type AppView = 'home' | 'search' | 'restaurant';

// Define SearchResults interface
interface SearchResults {
  searchTerm: string;
  cityId: string;
  cuisineType: string;
  priceRange: [number, number];
  restaurants: Restaurant[];
}

function App() {
  // State for view management
  const [currentView, setCurrentView] = useState<AppView>('home');
  
  // Restaurant and cuisine data
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState(getFeaturedRestaurants());
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const cuisines = getAllCuisines();

  useEffect(() => {
    if (currentView === 'home') {
      if (searchResults) {
        // If we have search results, display those
        setRestaurants(searchResults.restaurants);
      } else if (selectedCuisine) {
        // Otherwise, filter by selected cuisine
        setRestaurants(getRestaurantsByCuisine(selectedCuisine));
      } else {
        // Default to featured restaurants
        setRestaurants(getFeaturedRestaurants());
      }
    }
  }, [selectedCuisine, searchResults, currentView]);

  // Handle search from any component
  const handleSearch = (results: SearchResults) => {
    setSearchResults(results);
    setCurrentView('search');
  };

  const handleCuisineSelect = (cuisineId: string) => {
    // Clear any search results when selecting a cuisine
    setSearchResults(null);
    setSelectedCuisine(cuisineId);
    setCurrentView('home');
  };

  const handleRestaurantSelect = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
    setCurrentView('restaurant');
  };

  const handleGoBackFromSearch = () => {
    setCurrentView('home');
  };

  const handleGoBackFromRestaurant = () => {
    setCurrentView(searchResults ? 'search' : 'home');
  };

  // Determine the title to display based on search or selection
  const getRestaurantListTitle = () => {
    if (searchResults) {
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
        const cityName = searchResults.restaurants[0]?.location.cityId.toUpperCase() || cityId;
        title += ` in ${cityName}`;
      }
      
      return title;
    }
    
    if (selectedCuisine) {
      return `${selectedCuisine.charAt(0).toUpperCase() + selectedCuisine.slice(1)} Restaurants`;
    }
    
    return "Featured Restaurants";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header onSearch={handleSearch} />
      
      {currentView === 'home' && (
        <>
          <Hero onExplore={() => {
            // Scroll to cuisine section when explore button is clicked
            const cuisineSection = document.getElementById('cuisine-section');
            if (cuisineSection) {
              cuisineSection.scrollIntoView({ behavior: 'smooth' });
            }
          }} />
          <div className="w-full px-4 py-8">
            <section id="cuisine-section" className="mb-12">
              <CuisineCategory cuisines={cuisines} onSelectCuisine={handleCuisineSelect} />
            </section>
            <section id="restaurant-section">
              <RestaurantList 
                restaurants={restaurants} 
                title={getRestaurantListTitle()} 
                onSelectRestaurant={handleRestaurantSelect}
              />
            </section>
          </div>
        </>
      )}
      
      {currentView === 'search' && (
        <SearchPage 
          onSearch={handleSearch}
          searchResults={searchResults}
          onSelectRestaurant={handleRestaurantSelect}
          onGoBack={handleGoBackFromSearch}
        />
      )}
      
      {currentView === 'restaurant' && selectedRestaurant && (
        <RestaurantDetailPage 
          restaurant={getRestaurantById(selectedRestaurant) || null}
          onGoBack={handleGoBackFromRestaurant}
        />
      )}
      
      <Footer />
    </div>
  )
}

export default App
