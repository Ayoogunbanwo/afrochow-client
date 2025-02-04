"use client";
import { useLocalStorage } from "@/hooks/use-local-storage";
import MenuItemCard from "@/cards/Menucard";

const MenuSection = ({ popularItems, storeId }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const toggleFavorite = (itemId) => {
    setFavorites((prev) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      return prevArray.includes(itemId)
        ? prevArray.filter((id) => id !== itemId)
        : [...prevArray, itemId];
    });
  };

  return (
    <section id="menu" className="container px-6 py-12 mx-auto" aria-labelledby="menu-heading">
      <h2 id="menu-heading" className="mb-8 text-3xl font-bold text-center">Our Menu</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {popularItems.map((item) => (
          <MenuItemCard
            key={item.itemid} // Using item.itemid as the key
            item={item}
            isFavorite={favorites.includes(item.itemid)} // Updated to item.itemid
            toggleFavorite={toggleFavorite}
            storeId={storeId} // ✅ Now passing storeId correctly
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
