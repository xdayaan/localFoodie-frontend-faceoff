import React from 'react';
import { motion } from 'framer-motion';
import { Cuisine } from '../../data/cuisine';

interface CuisineCategoryProps {
  cuisines: Cuisine[];
  onSelectCuisine: (cuisineId: string) => void;
}

const CuisineCategory: React.FC<CuisineCategoryProps> = ({ cuisines, onSelectCuisine }) => {
  return (
    <section id="cuisine-section" className="container mx-auto py-12 bg-white">
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Popular Cuisines
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.id}
              className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-200"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => onSelectCuisine(cuisine.id)}
            >
              <div className="relative h-40 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
                  style={{ backgroundImage: `url(${cuisine.image})` }}
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {cuisine.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {cuisine.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuisineCategory;