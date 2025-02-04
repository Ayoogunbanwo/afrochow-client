"use client"; // Ensure this is a Client Component if using React hooks or interactivity
import { CheckCircle } from "lucide-react"; // Import the CheckCircle icon

const OrderConfirmation = ({ orderDetails }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
        <h2 className="mb-4 text-2xl font-bold text-center">Thank you for your order!</h2>
        <p className="mb-6 text-center text-gray-600">
          Your order has been placed successfully. Here are the details:
        </p>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-semibold">{orderDetails.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Paid:</span>
            <span className="font-semibold">${orderDetails.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span className="font-semibold">{orderDetails.deliveryDate}</span>
          </div>
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;