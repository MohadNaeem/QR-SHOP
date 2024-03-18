import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Input, TextField } from "@mui/material";

export default function CheckoutForm({ confirmOrder, order }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      billing_details: {
        name: order?.recipient?.name,
        email: order?.recipient?.email,
        orderId: order?.id,
      },
    });

    if (paymentIntent && paymentIntent.status === "succeeded") {
      confirmOrder();
      setIsProcessing(false);
      return;
    }

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="justify-center text-center items-center self-center px-16 py-4 mt-8 max-w-full text-xl font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px] w-[464px] max-md:px-5 max-md:mt-10"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay & Place Order"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
