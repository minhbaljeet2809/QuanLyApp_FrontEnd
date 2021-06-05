import React, { useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export function TextFieldCustom(props) {
    const {
        label,
        name,
        value,
        readOnly,
        handle,
        select,
        rowsMax
    } = props
    const [currency, setCurrency] = React.useState("");
    useEffect(() => {
        setCurrency(value);
        return () => {
            setCurrency("");
        }
    }, [value]);
    const handleChange = (event) => {
        setCurrency(event.target.value);
        let name = event.target.name;
        let value = event.target.value;
        handle(name, value);
    };

    return (
        <TextField
            select={select}
            label={label}
            value={currency}
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
    )

}