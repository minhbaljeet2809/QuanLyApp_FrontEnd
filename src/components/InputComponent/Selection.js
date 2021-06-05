import React, { useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export function Selection(props) {
    const {
        label,
        name,
        value,
        handle,
        listValueSelect,
        readOnly
    } = props
    const [currency, setCurrency] = React.useState(value);
    useEffect(() => {
        setCurrency(value);
    }, [value])

    const handleChange = (event) => {
        setCurrency(event.target.value);
        let name = event.target.name;
        let value = event.target.value;
        handle(name, value);
    };

    return (
        <TextField
            select
            label={label}
            value={currency}
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
    )

}