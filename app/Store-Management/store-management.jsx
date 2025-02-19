"use client"

import { useState, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StoreInformation from "@/components/store-information"
import StoreHours from "@/components/store-hours"
import StoreOperations from "@/components/store-operations"
import StoreItems from "@/components/store-items"
import AllItems from "@/components/all-item"
import { GiKnifeFork, GiCakeSlice, GiChiliPepper, GiBread, GiCookingPot, GiShop } from "react-icons/gi"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Store, Clock, Settings, Package, List, ChevronRight } from "lucide-react"

export const categories = [
  { icon: GiKnifeFork, label: "African Kitchen" },
  { icon: GiCakeSlice, label: "Small Chops/Cake" },
  { icon: GiChiliPepper, label: "Farm Produce" },
  { icon: GiBread, label: "Naija Bread" },
  { icon: GiCookingPot, label: "African Soup" },
  { icon: GiShop, label: "African Store" },
]

const tabConfig = [
  { id: "information", label: "Store Info", icon: Store },
  { id: "hours", label: "Hours", icon: Clock },
  { id: "operations", label: "Operations", icon: Settings },
  { id: "items", label: "Items", icon: Package },
  { id: "all-items", label: "All Items", icon: List },
]

const StoreManagement = () => {
  const [storeData, setStoreData] = useState({
    information: {
      name: "",
      logo: null,
      description: "",
      location: {
        street: "",
        apartment: "",
        city: "",
        postalCode: "",
        country: "Canada",
      },
      phone: "",
      category: "",
      otherCategory: "",
    },
    hours: {
      openingTime: "",
      closingTime: "",
      openingHour: "",
      closingHour: "",
    },
    operations: {
      deliveryFee: 0,
      pickupAvailable: false,
      deliveryAvailable: false,
    },
    items: [],
  })

  const [selectedTab, setSelectedTab] = useState("information")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const updateStoreData = useCallback((section, data) => {
    setStoreData(prev => ({
      ...prev,
      [section]: data,
    }))
  }, [])

  const handleDeleteItem = useCallback((id) => {
    setStoreData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Store className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">Store Management</CardTitle>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <ChevronRight className={`h-6 w-6 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </CardHeader>
            {isMobileMenuOpen && (
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  {tabConfig.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setSelectedTab(tab.id)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          selectedTab === tab.id
                            ? 'bg-orange-100 text-orange-700'
                            : 'hover:bg-orange-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <Card className="hidden lg:block w-64 h-fit bg-white shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Store className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Store Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                {tabConfig.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedTab === tab.id
                          ? 'bg-orange-100 text-orange-700 font-medium'
                          : 'hover:bg-orange-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                      {selectedTab === tab.id && (
                        <motion.div
                          layoutId="active-tab-indicator"
                          className="absolute left-0 w-1 h-8 bg-orange-500 rounded-r-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="flex-1 bg-white shadow-xl border-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {selectedTab === "information" && (
                  <StoreInformation
                    data={storeData.information}
                    updateData={(data) => updateStoreData("information", data)}
                    categories={categories}
                  />
                )}
                {selectedTab === "hours" && (
                  <StoreHours
                    data={storeData.hours}
                    updateData={(data) => updateStoreData("hours", data)}
                  />
                )}
                {selectedTab === "operations" && (
                  <StoreOperations
                    data={storeData.operations}
                    updateData={(data) => updateStoreData("operations", data)}
                  />
                )}
                {selectedTab === "items" && (
                  <StoreItems
                    data={storeData.items}
                    updateData={(data) => updateStoreData("items", data)}
                  />
                )}
                {selectedTab === "all-items" && (
                  <AllItems
                    data={storeData.items}
                    onDeleteItem={handleDeleteItem}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Store Summary Link */}
            <div className="p-6 border-t">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/store-summary"
                  className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl font-medium shadow-lg hover:bg-orange-600 transition-all hover:shadow-xl space-x-2"
                >
                  <Store className="h-5 w-5" />
                  <span>View Store Summary</span>
                </Link>
              </motion.div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StoreManagement