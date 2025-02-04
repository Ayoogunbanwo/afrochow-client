import React from "react";

const Calculator = ({ count, onIncrement, onDecrement, min = 1, max = 15 }) => {
  const buttonStyles = (isDisabled, borderColor) =>
    `bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full transition-all duration-200 border-2 ${borderColor} ${
      isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
    }`;

  return (
    <div className="flex flex-row items-center justify-center p-4 space-x-4 rounded-lg shadow-lg bg-gradient-to-r from-purple-500 to-pink-500">
      <button
        className={buttonStyles(count === min, "border-purple-500")}
        onClick={onDecrement}
        disabled={count === min}
        aria-label="Decrease quantity"
      >
        <span className="text-2xl">-</span>
      </button>
      <span className="text-2xl font-bold text-black" aria-live="polite">
        {count}
      </span>
      <button
        className={buttonStyles(count === max, "border-orange-500 hover:bg-orange-100")}
        onClick={onIncrement}
        disabled={count === max}
        aria-label="Increase quantity"
      >
        <span className="text-2xl">+</span>
      </button>
    </div>
  );
};

export default Calculator;
