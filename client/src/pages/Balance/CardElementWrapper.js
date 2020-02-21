import React, { useState } from "react";
import { Input, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  input: {
    width: "100%",
    border: "1px solid purple",
    borderRadius: "4px"
  }
});
const CardElementWrapper = ({ component, label, handleChange }) => {
  // const { component: Component, inputRef, ...other } = props;

  // implement `InputElement` interface
  // React.useImperativeHandle(inputRef, () => ({
  //   focus: () => {
  //     // logic to focus the rendered component from 3rd party belongs here
  //   }
  //   // hiding the value e.g. react-stripe-elements
  // }));
  const classes = useStyles();
  const [focused, setFocused] = useState(true);
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);

  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel focused={focused} shrink={focused || !empty} error={!!error}>
        {label}
      </InputLabel>
      <Input
        className={classes.input}
        fullWidth
        inputComponent={component}
        // helper
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        onChange={handleChange}
        inputProps={{ component }}
      />
    </FormControl>
  );
};

export default CardElementWrapper;
