import React from 'react';

// Libraries
import { TextField, MenuItem, makeStyles } from '@material-ui/core';

// Hooks
import { useSwitch } from 'hooks';

const CustomTextField = ({
  value,
  onChange,
  required = false,
  multiline = false,
  select = false,
  errorText = 'Required Field',
  validationError = 'Invalid Field',
  validationRegex,
  className,
  options,
  children,
  ...rest
}) => {
  const [error, open, close] = useSwitch(false);
  const [errorMessage, setErrorMessage] = React.useState(errorText);

  const isValid = validationRegex?.test(String(value).toLowerCase());
  const classes = useStyles();

  const handleOnBlur = (event) => {
    if (required && event.target.value === '') open();
    if (required && event.target.value === undefined) open();
    else if (!validationRegex?.test(String(value).toLowerCase())) {
      setErrorMessage(validationError);
      open();
    } else {
      setErrorMessage(errorText);
      close();
    }
  };

  React.useEffect(() => {
    if (value !== '' && isValid) close();
    if (value !== '' && !validationRegex) close();
  }, [value, close, isValid, open, validationRegex]);

  const inputProps = {
    value,
    onChange,
    onBlur: handleOnBlur,
    error,
    required,
    helperText: error && errorMessage,
    rows: 4,
    multiline,
    fullWidth: true,
    select,
    className: `${classes.textField} ${className}`,
    ...rest,
  };

  return select ? (
    <TextField {...inputProps}>
      {options
        ? options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        : children}
    </TextField>
  ) : (
    <TextField {...inputProps} />
  );
};

export default CustomTextField;

const useStyles = makeStyles(() => ({
  textField: {
    margin: '10px',
  },
}));
