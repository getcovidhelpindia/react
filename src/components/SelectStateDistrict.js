import React from 'react';

// Libraries
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';

// Components
import { CustomTextInput } from 'components';

// Assets
import { StatesAndDistricts } from 'assets';

const AddInfo = ({
  showDistrict = true,
  indiaState,
  setIndiaState,
  indiaDistrict,
  setIndiaDistrict,
  resourceType,
  setResourceType,
}) => {
  const classes = useStyles();

  return (
    <div>
      <CustomTextInput
        value={indiaState}
        onChange={setIndiaState}
        label='State'
        variant='outlined'
        required
        select
        className={classes.selectEmpty}
      >
        {StatesAndDistricts.states.map((item, index) => (
          <MenuItem key={`States-${index}`} value={index}>
            {item.state}
          </MenuItem>
        ))}
      </CustomTextInput>

      {showDistrict && (
        <CustomTextInput
          value={indiaDistrict}
          onChange={setIndiaDistrict}
          label='District'
          variant='outlined'
          required
          select
          className={classes.selectEmpty}
        >
          {indiaState > 0 ? (
            StatesAndDistricts.states[indiaState].districts.map(
              (item, index) => (
                <MenuItem key={`Districts-${index}`} value={index}>
                  {item}
                </MenuItem>
              )
            )
          ) : (
            <div />
          )}
        </CustomTextInput>
      )}

      <CustomTextInput
        value={resourceType}
        onChange={setResourceType}
        label='Resource Type'
        variant='outlined'
        required
        select
        className={classes.selectEmpty}
      >
        <MenuItem value={0}>Oxygen</MenuItem>
        <MenuItem value={1}>Medicines</MenuItem>
        <MenuItem value={2}>Plasma Donor</MenuItem>
        <MenuItem value={3}>Hospital Bed</MenuItem>
        <MenuItem value={4}>Testing Facility</MenuItem>
      </CustomTextInput>
    </div>
  );
};

export default AddInfo;

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    width: '30%',
    marginTop: theme.spacing(2),
  },
}));
