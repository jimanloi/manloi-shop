import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

const CheckoutForm: React.FC<{ totalPrice: number }> = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    // Send payment request to backend
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      setMessage(`❌ Payment failed: ${error.message}`); // Show error
    } else {
      setMessage("✅ Payment successful! Thank you for your purchase.");
      setTimeout(() => {
        dispatch(clearCart());
      }, 5000);
    }
  };

  return (
    <div>
      {message ? (
        <p className="mt-4 text-lg font-semibold text-center">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6">
          <CardElement className="border p-3 rounded-md bg-gray-100" />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md mt-4 hover:bg-green-600"
            disabled={!stripe}
          >
            Pay ${totalPrice.toFixed(2)}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
