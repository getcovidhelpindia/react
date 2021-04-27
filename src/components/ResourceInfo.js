import React from 'react';

// Libraries
import { makeStyles } from '@material-ui/core/styles';

// Components
import { CustomTextInput } from 'components';

const AddInfo = ({
  name,
  setName,
  contact,
  setContact,
  location,
  setLocation,
  info,
  setInfo,
  source,
  setSource,
  handleSubmitForm,
}) => {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmitForm}
    >
      <div className={classes.formRow1}>
        <CustomTextInput
          label='Name'
          value={name}
          onChange={setName}
          variant='outlined'
          required
          className={classes.selectEmpty}
        />
        <CustomTextInput
          label='Contact'
          value={contact}
          onChange={setContact}
          variant='outlined'
          required
          className={classes.selectEmpty}
        />
        <CustomTextInput
          label='Location'
          value={location}
          onChange={setLocation}
          variant='outlined'
          required
          className={classes.selectEmpty}
        />
      </div>

      <div className={classes.row2}>
        <CustomTextInput
          label='Information'
          value={info}
          onChange={setInfo}
          variant='outlined'
          required
          multiline
          fullWidth
          style={{ width: '60%' }}
          className={classes.selectEmpty}
        />
      </div>

      <div className={classes.row3}>
        <CustomTextInput
          label='Source'
          value={source}
          onChange={setSource}
          variant='outlined'
          required
          className={classes.selectEmpty}
        />
      </div>
    </form>
  );
};

export default AddInfo;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  row1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  row2: {},
  row3: {},
  selectEmpty: {
    width: '19.2%',
    marginTop: theme.spacing(2),
  },
}));
