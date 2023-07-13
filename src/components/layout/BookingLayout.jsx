import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Header from "../common/Header";
import Footer from "../common/Footer";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51MwSGfItrzk46JwuUcMyEF34q9bXGZTsKJuUSwiWDdvEdtX4ORkDoNxvr1KjqMGbRlMccRoIrmJFuDnfcwHzlCV100YJDhC5Tm");


const BookingLayout = (props) => {
  return (
    <div className="booking-layout">
      <Header />
      <div className="booking-layout__content">
      <Elements stripe={stripePromise}>
      {props.children} 
      </Elements>
        
        <Footer />
      </div>
    </div>
  );
};

export default BookingLayout;
