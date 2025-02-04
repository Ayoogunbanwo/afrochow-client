"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/restauarant_Navbar";
import HeroSection from "@/components/HeroSection_restaurant";
import MenuSection from "@/components/menu_restaurant";
import AboutSection from "@/components/aboutrestuarant";
import ReviewsSection from "@/components/reviews_restaurant";
import testData from "@/data/newdata10.json"; 

const StorePage = () => {
  const { storeId } = useParams();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storeId) {
      setError("Store ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const store = testData.find((s) => s.storeId?.toString() === storeId?.toString());

      if (!store) throw new Error("Restaurant not found.");

      setStoreData(store);
      setError(null);
    } catch (err) {
      console.error("Error fetching store data:", err);
      setError(err.message || "Error fetching store data.");
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <Header 
        name={storeData?.name} 
        logo={storeData?.logo} 
        description={storeData?.description} 
      />
      
      {/* Hero Section */}
      <HeroSection {...storeData} />
      
      {/* About Section */}
      <AboutSection {...storeData} />
      
      {/* Menu Section */}
      <MenuSection 
        popularItems={storeData?.popularItems || []} 
        storeId={storeId} 
      />
      
      {/* Reviews Section */}
      <ReviewsSection reviews={storeData?.reviews || []} />
    </div>
  );
};

export default StorePage;
