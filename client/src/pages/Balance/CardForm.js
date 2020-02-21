import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  // PostalCodeElement,
  injectStripe
} from "react-stripe-elements";
import { Grid, makeStyles } from "@material-ui/core";
import CardElementWrapper from "./CardElementWrapper";

const useStyles = makeStyles({
  input: {
    textAlign: "center",
    width: "60%",
    margin: "2vh"
  },
  cardElement: {
    width: "100%"
  },
  button: {
    backgroundColor: "#43DDC1",
    marginTop: "2vh",
    marginBottom: "2vh",
    width: "100%"
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

  const handleSubmit = () => {};

  const handleChange = e => setter => {
    console.log("changed");
    setter(e.target.value);
    console.log(cardNumber);
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Grid item xs={12} style={{ width: "100%" }}>
        <CardElementWrapper
          component={CardNumberElement}
          label="Card Number"
          handleChange={handleChange(setCardNumber)}
        />
      </Grid>
      <Grid item xs={12} style={{ width: "100%" }}>
        <CardElementWrapper
          component={CardExpiryElement}
          label="Expiration Date"
          handleChange={e => handleChange(e, setExpirationDate)}
        />
      </Grid>
      <Grid item xs={12} style={{ width: "100%" }}>
        <CardElementWrapper
          component={CardCvcElement}
          label="CVC"
          handleChange={e => handleChange(e, setSecurityCode)}
        />
      </Grid>
    </Grid>
  );
};

export default injectStripe(CardForm);
