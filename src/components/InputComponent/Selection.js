/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export function Selection(props) {
  const { label, name, value, handle, listValueSelect, readOnly } = props;
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    handle(name, value);
  };

  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      margin="dense"
      name={name}
      fullWidth
      InputProps={{
        readOnly: readOnly,
      }}
    >
      {listValueSelect?.map((option) => (
        <MenuItem key={option.index} value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </TextField>
  );
}
