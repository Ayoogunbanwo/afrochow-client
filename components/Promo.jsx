import React from "react";
import { motion } from "framer-motion";
import { GiForkKnifeSpoon, GiCakeSlice } from "react-icons/gi";

const Promo = () => {
  return (
    <div className="py-8 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between px-6 py-8 bg-white rounded-lg shadow-lg md:flex-row"
        >
          {/* Text Content */}
          <div className="flex-1 mb-6 text-center md:text-left md:mb-0">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-orange-900 sm:text-4xl">
              Afrochow has you covered 🍱
            </h1>
            <p className="mb-6 text-base text-orange-700 sm:text-lg">
              Hungry? Too tired to cook? Have friends over, or do you simply need to chop life? Find an African Kitchen around you to take the stress off you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-sm font-semibold text-white transition-colors bg-orange-500 rounded-lg sm:text-base hover:bg-orange-600"
            >
              Find OpenKitchens Near Me
            </motion.button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-200/50"
            >
              <GiForkKnifeSpoon className="w-10 h-10 text-orange-600 sm:w-12 sm:h-12" />
            </motion.div>
            <motion.div
              whileHover={{ rotate: -15 }}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-200/50"
            >
              <GiCakeSlice className="w-10 h-10 text-purple-600 sm:w-12 sm:h-12" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Promo;
