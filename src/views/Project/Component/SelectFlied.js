/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";

export function SelectCustom(props) {
  const { label, name, value, readOnly, handle, listValueSelect } = props;

  const handleChange = (event) => {
    let value = event.target.value;
    const teacher = _.find(listValueSelect, { id: value });
    handle(teacher);
  };

  return (
    <TextField
      margin="dense"
      select
      label={label}
      value={value}
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
