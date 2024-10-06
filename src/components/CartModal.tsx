import React from "react";
import { useCart } from "../context/CartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  onCheckout,
}) => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  if (!isOpen) return null;

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-96 h-full p-6 transform transition-transform duration-300 ease-in-out translate-x-0 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
        <div className="space-y-6 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{item.title}</span>
                <span className="text-sm text-gray-600">${item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded transition duration-300 ease-in-out"
                >
                  -
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded transition duration-300 ease-in-out"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <div className="text-xl font-bold mb-4 text-gray-800">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button
            onClick={onCheckout}
            className={`w-full py-3 rounded-lg font-bold transition duration-300 ease-in-out ${
              cart.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
          <button
            onClick={onClose}
            className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;