import React, { useState, useEffect } from "react";
import CreditCardContainer from "components/SignUpContainer";
import NameForm from "./NameForm";
import CardForm from "./CardForm";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Paper,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles({
  text: {
    fontSize: "3vw",
    fontWeight: "800"
  },
  button: {
    backgroundColor: "#43DDC1",
    // marginLeft: "30%",
    // marginRight: "30%",
    marginTop: "1vh",
    marginBottom: "1vh",
    width: "75%"
  }
});

const CardSection = ({ setEditCredit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [securityCodeError, setSecurityCodeError] = useState("");
  const [expirationDateError, setExpirationDateError] = useState("");
  const classes = useStyles();

  const handleSubmit = () => {
    if (!firstName) {
      setFirstNameError("Please enter first name");
    }
    if (!lastName) {
      setLastNameError("Please enter last name");
    }
  };

  useEffect(() => {
    console.log(cardNumber);
  }, [cardNumber]);

  return (
    <CreditCardContainer>
      <Grid container direction="column" alignItems="center">
        <NameForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          firstNameError={firstNameError}
          lastNameError={lastNameError}
        />
        <Grid item container xs={12}>
          <CardForm
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardNumberError={setCardNumberError}
            expirationDate={expirationDate}
            setExpirationDate={setExpirationDate}
            cardExpirationDate={setExpirationDate}
            securityCode={securityCode}
            setSecurityCode={setSecurityCode}
            securityCodeError={setSecurityCodeError}
          />
        </Grid>
        <Grid
          item
          container
          xs={8}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={6}>
            <Button
              className={classes.button}
              onClick={setEditCredit}
              color="primary"
              variant="contained"
            >
              Edit cart
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </CreditCardContainer>
  );
};

export default CardSection;
