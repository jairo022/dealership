import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import '../App.css';

// Set up Firebase Functions
const functions = getFunctions();
const createPaymentIntent = httpsCallable(functions, 'createPaymentIntent');

const PaymentForm = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Store payment errors
  const [succeeded, setSucceeded] = useState(false); // Payment success state
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null); // Reset previous errors

    try {
      // Call Firebase function to create the PaymentIntent
      const result = await createPaymentIntent({ amount });

      const clientSecret = result.data.clientSecret;

      // Confirm the payment with the client secret
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message); // Show error message if payment fails
      } else if (paymentIntent.status === 'succeeded') {
        setSucceeded(true); // Mark payment as successful
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("There was an issue with the payment processing.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="payment-form">
      <h2>Book Your Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {error && <div className="error-message">{error}</div>}
        {succeeded ? (
          <div className="success-message">Payment Successful!</div>
        ) : (
          <button type="submit" disabled={loading || !stripe}>
            {loading ? "Processing..." : "Pay"}
          </button>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
