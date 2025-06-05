import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded flex justify-between items-center text-left bg-gray-100 gap-3"
            >
              <div className="flex items-center gap-4 w-2/3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400"
                  onClick={() =>
                    item.quantity > 1
                      ? dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      : dispatch(removeFromCart(item.id))
                  }
                >
                  ➖
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  ➕
                </button>
              </div>
              <button
                className="bg-red-200 text-xs text-white px-3 py-1 rounded-md hover:bg-red-500"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                X
              </button>
            </div>
          ))}
          <div className="text-right text-xl font-bold mt-6">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition">
            Proceed to payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
