/* eslint-disable no-bitwise */
import React from 'react';

// Libraries
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import axios from 'axios';

// Components
import { Layout, SelectStateDisctrict, ResourceInfo } from 'components';

// Hooks
import { useInput, useSwitch, useTheme } from 'hooks';

// Assets
import { StatesAndDistricts } from 'assets';

const AddInfo = ({ darkMode }) => {
  const classes = useStyles();

  // States
  const [name, setName, resetName] = useInput('');
  const [contact, setContact, resetContact] = useInput('');
  const [location, setLocation, resetLocation] = useInput('');
  const [info, setInfo, resetInfo] = useInput('');
  const [source, setSource, resetSource] = useInput('');
  const [indiaState, setIndiaState, resetIndiaState] = useInput('');
  const [indiaDistrict, setIndiaDistrict, resetIndiaDistrict] = useInput('');
  const [resourceType, setResourceType, resetResourceType] = useInput('');

  // Switches
  const [loading, openLoading, closeLoading] = useSwitch(false);
  const [success, openSuccess, closeSuccess] = useSwitch(false);
  const [failure, openFailure, closeFailure] = useSwitch(false);

  const themeConfig = useTheme(darkMode);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonFailure]: failure,
  });

  const resetAll = () => {
    resetName();
    resetContact();
    resetLocation();
    resetInfo();
    resetSource();
    resetIndiaState();
    resetIndiaDistrict();
    resetResourceType();
  };

  const verifyForm = () => {
    if (!loading) openLoading();
    if (
      !indiaState |
      !indiaDistrict |
      !resourceType |
      !name |
      !contact |
      !location |
      !info |
      !source
    )
      // eslint-disable-next-line no-alert
      alert('Please fill in all the details.');
  };

  const setIndicators = (cb, overide) => {
    closeLoading();
    cb();
    setTimeout(overide, 2000);
  };

  const handleSubmitForm = (event) => event.preventDefault();
  const dataSubmit = async () => {
    verifyForm();
    const { state } = StatesAndDistricts.states[indiaState];
    const district =
      StatesAndDistricts.states[indiaState].districts[indiaDistrict];
    const payload = {
      state,
      district,
      type: resourceType,
      source,
      info: {
        name,
        contact,
        description: info,
        location,
      },
    };

    try {
      const { data } = await axios.post(
        'https://api.getcovidhelp.in/addData',
        payload,
      );

      if (data) {
        setIndicators(openSuccess, () => {
          resetAll();
          closeSuccess();
        });
      } else {
        setIndicators(closeFailure);
      }
    } catch (error) {
      setIndicators(openFailure);
    }
  };

  return (
    <Layout footerClassName={classes.footer}>
      <ThemeProvider theme={themeConfig}>
        <div className={classes.rootDiv}>
          <SelectStateDisctrict
            {...{
              indiaState,
              setIndiaState,
              indiaDistrict,
              setIndiaDistrict,
              resourceType,
              setResourceType,
            }}
          />

          <ResourceInfo
            {...{
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
            }}
          />

          <div className={classes.rootButton}>
            <div className={classes.wrapper}>
              <Button
                variant='contained'
                color='primary'
                onClick={dataSubmit}
                disabled={loading}
                className={buttonClassname}
              >
                Submit
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </div>

          <div>
            <p>
              Data once added is approved by one of the team members before it
              comes on website. To know more, visit{' '}
              <a href='/about'>About Section</a>
            </p>
          </div>
        </div>
      </ThemeProvider>
    </Layout>
  );
};

export default AddInfo;

const useStyles = makeStyles((theme) => ({
  rootDiv: {
    height: '40rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginLeft: '10%',
    marginTop: '2%',
    marginBottom: '10%',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  rootButton: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonFailure: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  footer: {
    top: 'auto',
  },
}));
