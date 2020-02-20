import React from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  // PostalCodeElement,
  injectStripe,
  ReactStripeElements
} from "react-stripe-elements";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Paper,
  TextField
} from "@material-ui/core";
import CreditCardInput from "react-credit-card-input";

const useStyles = makeStyles({
  input: {
    textAlign: "center",
    width: "60%",
    margin: "2vh"
  },
  cardElement: {
    width: "100%",
    margin: ""
  }
});

const CardForm = ({
  cardNumber,
  setCardNumber,
  creditNumberError,
  expirationDate,
  setExpirationDate,
  expirationDateError,
  securityCode,
  setSecurityCode,
  securityCodeError
}) => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} direction="row" alignItems="center">
      <CardNumberElement
        className={classes.cardElement}
        handleChange={setCardNumber}
      />
      <CardExpiryElement className={classes.cardElement} />
      <CardCvcElement className={classes.cardElement} />
      {/* <PostalCodeElement className={classes.cardElement} /> */}
    </Grid>
  );
};

export default injectStripe(CardForm);
