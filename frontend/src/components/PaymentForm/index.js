import React, { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Form,
  Button,
} from "./PaymentForm.style";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51Ofp6nBfnAA6oPPm24KtO1quaHWzz7dxO3LsIGgcbLWd7Ya2zRz26OSDDS9hPiMX6KtoL2FjSI2y0y8yTJUMRKAt00sCQa3vgL"
);

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

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" disabled={!stripe}>
        Pay Now
      </Button>
    </Form>
  );
};

// class CheckoutForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null,
//     };
//   }

//   handlePayment = async (e) => {
//     e.preventDefault();

//     try {
//       console.log('Payment successful');
//     } catch (e) {
//       console.error('Error during payment:', e);
//     }
//   };

//   calculateTotalAmount = () => {
//     return 1000;
//   };

//   render() {
//     return (
//       <Container>
//         <Form>
//           <Label>
//             <MainText>
//               Card Details
//             </MainText>
//             <CardElement />
//           </Label>
//           <PaymentElement />

//           {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
//
//         </Form>
//       </Container>
//     );
//   }
// }

const PaymentForm = () => {
  const [clientSecret, setClientSecret] = useState(null);

  const createPaymentIntent = async () => {
    const response = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/payment_intents",
      data: "amount=2000&currency=usd&automatic_payment_methods[enabled]=true",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer sk_test_51Ofp6nBfnAA6oPPmyNEmBbSRfxVNtoDY9reY0YmwYU5S5DDOSMPNwdC8GEQYRl1Df3RppkzbSuzneL1so61qJy4r000ehbhKg7`,
      },
    });

    return response.data;
  };

  useEffect(() => {
    createPaymentIntent().then((paymentIntent) => {
      console.log(paymentIntent);
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
