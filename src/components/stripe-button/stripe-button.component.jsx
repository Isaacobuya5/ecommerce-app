import React from "react";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_OC1Bw2W9TrSKOMPYBRVildNs00BCpQ1pPq";

  const onToken = token => {
    console.log(token);
    // gets the token that we can pass to the server in case we need to really process the payments
    alert("Payment Succesful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Isaac Clothes E-Shop"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
