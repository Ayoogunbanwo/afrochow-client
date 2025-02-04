"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [testData, setTestData] = useState(null); // Full test data
  const [filteredTestData, setFilteredTestData] = useState(null); // Filtered test data by storeId
  const [deliveryFee, setDeliveryFee] = useState(null); // Delivery fee for a specific store
  const [deliverytime, setDeliverytime] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for initial fetch
  const [isLoading, setIsLoading] = useState(false); // Loading state for async actions

  // Fetch the test data on initial mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate fetching data (replace this with actual fetch logic)
        const data = await import("@/data/newdata10.json");
        setTestData(data.default);
      } catch (error) {
        console.error("Failed to load test data:", error);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter test data by storeId and update delivery fee
  const filterByStoreId = (storeId) => {
    if (!testData || !storeId) return;

    const numericStoreId = Number(storeId);
    const store = testData.find((store) => store.storeId === numericStoreId);

    if (store) {
      setFilteredTestData(store);
      setDeliveryFee(store.deliveryFee); // Update delivery fee for the store
      setDeliverytime(store.deliveryTime);
    }
  };

  // Expose the context values
  return (
    <UserContext.Provider
      value={{
        testData,
        filteredTestData,
        loading,
        isLoading,
        deliveryFee,
        deliverytime,
        filterByStoreId,
        setDeliveryFee, // Expose function to manually set the delivery fee
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing UserContext
export const useUserContext = () => useContext(UserContext);
