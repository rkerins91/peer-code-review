import React, { useState, useContext } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
// import { Grid, Typography, Button, makeStyles, Paper } from "@material-ui/core";
import { UserContext } from "context/UserContext";
import axios from "axios";
import NameForm from "./NameForm";
// import Cart from "./Cart";
import SelectAmount from "./SelectAmount";
// import CheckoutForm from "./CheckoutForm";
// import CardSection from "./CardSection";

const PurchaseCredits = () => {
  const { user } = useContext(UserContext);
  let [balance, setBalance] = useState(null);
  let [credits, setCredits] = useState(1);
  let [checkout, setCheckout] = useState(false);

  const decrementCredits = () => {
    credits > 1 && setCredits(--credits);
  };
  const incrementCredits = () => {
    setCredits(++credits);
  };

  // WILL USE THIS CODE ONCE I ADD CODE FOR CHECKOUT
  // const handleToggle = () => {
  //   setCheckout(!checkout);
  // };

  const handleSubmit = async () => {
    const data = await axios.put(`/user/${user._id}/add-credit`, {
      credits: credits
    });
    if (data.status === 200) {
      // if balance is not null add balance and credits, else add credits and credits on user context
      const newBalance = (balance ? balance : user.credits) + credits;
      setBalance(newBalance);
    }
  };

  if (!user) {
    return <></>;
  }
  return (
    <StripeProvider apiKey="pk_test_SiybGhOykaltlAsTtJZoMCeq00IeRPoG1J">
      {!checkout ? (
        <SelectAmount
          // if balance is null, use user context to show balance, else use state
          balance={balance || user.credits}
          credits={credits}
          decrement={decrementCredits}
          increment={incrementCredits}
          setCheckout={handleSubmit}
        />
      ) : (
        <Elements>{/* <CardSection /> */}</Elements>
      )}
    </StripeProvider>
  );
};

export default PurchaseCredits;
