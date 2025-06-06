import CheckoutForm from "../components/CheckoutForm";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/"); // Sends user back to cart if accessed directly
    }
  }, [cartItems, navigate]);

  const totalPrice = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice} />
      </Elements>
    </div>
  );
};

export default Payment;
