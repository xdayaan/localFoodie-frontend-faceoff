import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Restaurant } from '../../data/restaurant';

interface HeroProps {
  onExplore?: () => void;
  onSearch?: (results: {
    searchTerm: string;
    cityId: string;
    cuisineType: string;
    priceRange: [number, number];
    restaurants: Restaurant[];
  }) => void;
}

// Slider content for the hero section
const sliderContent = [
  {
    id: 1,
    image: 'https://solarisanna.sirv.com/cuisines/indian.jpg',
    title: 'Discover the taste of your neighborhood!',
    description: 'Explore amazing restaurants and delicious cuisines from around the world, all just a few clicks away.'
  },
  {
    id: 2,
    image: 'https://solarisanna.sirv.com/cuisines/italian.jpeg',
    title: 'Experience authentic Asian flavors',
    description: 'From sizzling stir-fries to delicate sushi, embark on a culinary journey across Asia.'
  },
  {
    id: 3,
    image: 'https://solarisanna.sirv.com/cuisines/italian.jpeg',
    title: 'Indulge in Italian classics',
    description: 'Savor the rich flavors of Italy with handcrafted pasta, wood-fired pizzas, and decadent desserts.'
  }
];

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      // Default behavior: scroll to cuisine section
      const cuisineSection = document.getElementById('cuisine-section');
      if (cuisineSection) {
        cuisineSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container  relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-2xl mx-auto my-4">
      {/* Slider with images */}
      <AnimatePresence mode="wait">
        {sliderContent.map((slide, index) => (
          currentSlide === index && (
            <motion.div 
              key={slide.id}
              className="absolute inset-0 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              
              {/* Content with fading border */}
              <div className="relative h-full w-full px-4 flex items-center">
                <div className="w-full md:w-1/2 pr-4">
                  <motion.div
                    className="p-4 md:p-8 relative z-10 bg-black/30 backdrop-blur-sm rounded-lg shadow-lg border border-white/10"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Fading border effect */}
                    <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent to-primary/20 z-0 rounded-r-lg"></div>
                    
                    <motion.h1 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 relative z-10"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      {slide.title}
                    </motion.h1>
                    
                    <motion.p 
                      className="text-base sm:text-lg text-white mb-6 md:mb-8 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      {slide.description}
                    </motion.p>
                    
                    <motion.button
                      className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium shadow-lg transition-all duration-300 relative z-10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      onClick={handleExploreClick}
                    >
                      Explore Now
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Slider navigation dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
        {sliderContent.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              currentSlide === index 
                ? 'bg-primary' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;