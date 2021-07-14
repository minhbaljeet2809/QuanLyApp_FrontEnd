/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";

export function InputCustom(props) {
  const { label, name, value, readOnly, handle, rowsMax } = props;
  //   const [currency, setCurrency] = React.useState("");
  //   useEffect(() => {
  //     setCurrency(value);
  //     return () => {
  //       setCurrency("");
  //     };
  //   }, [value]);
  const handleChange = (event) => {
    // setCurrency(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    const payload = {
      name: name,
      value: value,
    };
    handle(payload);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      margin="dense"
      name={name}
      multiline={rowsMax ? true : false}
      rowsMax={rowsMax ? rowsMax : 1}
      fullWidth
      InputProps={{
        readOnly: readOnly,
      }}
    />
  );
}
