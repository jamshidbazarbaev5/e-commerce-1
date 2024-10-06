import React, { useState } from "react";
import { Link, Route, Routes, useLocation, matchPath } from "react-router-dom";
import UserList from "./components/UserList";
import SearchFilter from "./components/SearchFilter";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartModal from "./components/CartModal";
import CheckoutModal from "./components/CheckoutModal";
import { CartProvider } from "./context/CartContext";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const location = useLocation();
  
  const isUserListPage = location.pathname === "/users";
  
  const isDetailsPage = matchPath("/product/:id", location.pathname);

  return (
    <CartProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold  mb-5">E-commerce</h1>

        {!isUserListPage && !isDetailsPage && (
          <>
           
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
            />
            <div className="flex space-x-4">
              <Link to="/users">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-3">
                  Show Users
                </button>
              </Link>
            </div>
          </>
        )}

        {isUserListPage && (
          <div className="flex space-x-4 ml-5">
            <Link to="/">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-3">
                Hide Users
              </button>
            </Link>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <ProductList searchTerm={searchTerm} filterType={filterType} />
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

        {!isUserListPage && isDetailsPage && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          >
            Cart
          </button>
        )}

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      </div>
    </CartProvider>
  );
};

export default App;
