/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export function SelectCustom(props) {
  const { label, name, value, readOnly, handle, listValueSelect } = props;

  const [currency, setCurrency] = React.useState(value);

  const handleChange = (event) => {
    setCurrency(event.target.value);
    let name = event.target.name;
    let value = event.target.value;
    handle(name, value);
  };

  return (
    <TextField
      margin="dense"
      select
      label={label}
      value={currency}
      onChange={handleChange}
      variant="outlined"
      name={name}
      fullWidth
      InputProps={{
        readOnly: readOnly,
      }}
    >
      {listValueSelect?.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.level}. {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
