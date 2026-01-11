import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="home">
      {/* 🔹 Store Header */}
      <header className="store-header">
   
        <p>Modern products, best prices, premium quality</p>
      </header>

      {/* 🔹 Category Filter */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* 🔹 Products Grid */}
      <section className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="empty">No products found</p>
        )}
      </section>

     
    </main>
  );
}
