import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface ProductListProps {
  searchTerm: string;
  filterType: string;
}

const ProductList: React.FC<ProductListProps> = ({
  searchTerm,
  filterType,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products", currentPage],
    queryFn: () =>
      fetchProducts(currentPage * productsPerPage, productsPerPage),
  });

  const { addToCart } = useCart();

  if (isLoading)
    return (
      <div className="text-center py-8 text-gray-600">Loading products...</div>
    );
  if (error)
    return (
      <div className="text-center py-8 text-red-600">
        Error fetching products
      </div>
    );

  const filteredProducts = products
    ?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterType === "lowToHigh") return a.price - b.price;
      if (filterType === "highToLow") return b.price - a.price;
      return 0;
    });

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <h3 className="font-bold text-lg mb-2 text-gray-800 ml-4">
                {product.title}
              </h3>
            </Link>
            <div className="p-4">
              <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-l hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="flex items-center mx-2">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage >= totalPages - 1}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-r hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
