import React, { useState } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
// import CreditsContainer from "components/SignUpContainer";
// import { Grid, Typography, Button, makeStyles, Paper } from "@material-ui/core";

// import Cart from "./Cart";
import SelectAmount from "./SelectAmount";
// import CheckoutForm from "./CheckoutForm";
import CardSection from "./CardSection";

const PurchaseCredits = () => {
  let [credits, setCredits] = useState(1);
  let [checkout, setCheckout] = useState(false);

  const decrementCredits = () => {
    credits > 0 && setCredits(--credits);
  };
  const incrementCredits = () => {
    setCredits(++credits);
  };

  const handleToggle = () => {
    setCheckout(!checkout);
  };

  return (
    <StripeProvider apiKey="pk_test_SiybGhOykaltlAsTtJZoMCeq00IeRPoG1J">
      {!checkout ? (
        <SelectAmount
          credits={credits}
          decrement={decrementCredits}
          increment={incrementCredits}
          setCheckout={handleToggle}
        />
      ) : (
        <Elements>
          <CardSection setEditCredit={handleToggle} />
        </Elements>
      )}
    </StripeProvider>
  );
};

export default PurchaseCredits;
