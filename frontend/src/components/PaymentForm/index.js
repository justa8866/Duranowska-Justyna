import React, { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Form, Button, Container, Label, MainText } from "./PaymentForm.style";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const tempCart = localStorage.getItem("cart");
    localStorage.removeItem("cart");

    stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://ecommerce-6e27c.web.app/success",
      },
    }).then(function(result) {
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
        localStorage.setItem("cart", tempCart);
      }
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>
          <MainText>Card Details</MainText>
        </Label>
        <PaymentElement />
        <Button type="submit" disabled={!stripe}>
          Pay Now
        </Button>
      </Form>
    </Container>
  );
};

const PaymentForm = () => {
  const [clientSecret, setClientSecret] = useState(null);

  function calculateTotalAmount() {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      return 0;
    }

    let totalAmount = 0;

    for (let item of cart) {
      const price = item.product.prices.find(price => price.currency.label === 'USD');

      if (!price) {
        continue;
      }

      totalAmount += price.amount * item.quantity;
    }

    return totalAmount;
  }

  const createPaymentIntent = async () => {
    const total = calculateTotalAmount();

    const response = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/payment_intents",
      data: `amount=${total.toFixed(2) * 100}&currency=usd&automatic_payment_methods[enabled]=true`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
      },
    });

    return response.data;
  };

  useEffect(() => {
    createPaymentIntent().then((paymentIntent) => {
      setClientSecret(paymentIntent.client_secret);
    });
  }, []);

  if (!clientSecret) {
    return null;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentForm;
