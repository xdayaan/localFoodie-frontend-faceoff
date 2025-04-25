import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white pt-12 pb-6 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Local Foodie</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Local Foodie is your go-to platform for discovering delicious cuisines and amazing restaurants in your area.
              We connect food lovers with the best local and international flavors.
            </p>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-primary dark:text-primary-light" />
                <a href="mailto:support@localfoodie.com" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">
                  support@localfoodie.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-primary dark:text-primary-light" />
                <a href="tel:+18005555555" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">
                  +1 (800) 555-5555
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1 text-primary dark:text-primary-light" />
                <span className="text-gray-600 dark:text-gray-300">
                  123 Food Street, Cuisine City, FC 98765
                </span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Restaurants', 'Cuisines', 'About Us', 'Partner With Us', 'Careers'].map(link => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Subscribe to our newsletter for the latest food updates and exclusive offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address"
                className="bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-l-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary-light"
              />
              <button className="bg-primary dark:bg-primary-light text-white px-4 py-2 rounded-r-md hover:bg-primary-dark dark:hover:bg-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Social Media and Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
              <a 
                key={index}
                href="#" 
                className="bg-white dark:bg-black text-primary dark:text-primary-light p-2 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-black transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Local Foodie. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;