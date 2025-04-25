import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
import { Restaurant } from "../../data/restaurant";

interface HeaderProps {
  onSearch?: (results: {
    searchTerm: string;
    cityId: string;
    cuisineType: string;
    priceRange: [number, number];
    restaurants: Restaurant[];
  }) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch
}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle search results
    const handleSearch = (results: {
        searchTerm: string;
        cityId: string;
        cuisineType: string;
        priceRange: [number, number];
        restaurants: Restaurant[];
    }) => {
        if (onSearch) {
            onSearch(results);
        }
    };

    return (
        <motion.header 
            className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? "bg-white shadow-md" 
                    : "bg-white"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className="w-full px-4 py-2">
                <div className="flex justify-center items-center py-2">
                    {/* Logo & Branding - Clickable to home */}
                    <motion.div 
                        className="flex items-center z-10"
                        whileHover={{ scale: 1.05 }}
                    >
                        <a href="/" className="text-xl sm:text-2xl font-bold">
                            <span className="text-green-600">Local</span>
                            <span className="text-gray-700">Foodie</span>
                        </a>
                    </motion.div>
                </div>

                {/* Search Bar */}
                <div className="py-3">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
        </motion.header>
    );
};

export default Header;