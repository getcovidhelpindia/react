import React from 'react';

// Libraries
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';

// Components
import { Layout, SelectStateDisctrict, ResourceInfo } from 'components';

// Hooks
import { useInput, useSwitch } from 'hooks';

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

  const handleSubmitForm = (event) => event.preventDefault();
  const dataSubmit = (event) => {
    if (!loading) openLoading();
    try {
      const payload = {
        state: StatesAndDistricts.states[indiaState].state,
        district:
          StatesAndDistricts.states[indiaState].districts[indiaDistrict],
        type: resourceType,
        info: {
          name: name,
          contact: contact,
          description: info,
          location: location,
        },
        source: source,
        createdAt: new Date(),
        isApproved: true,
        isFlagged: false,
        usefulness: 0,
        isHidden: false,
      };
      console.log(JSON.stringify(payload));
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      fetch('https://api.getcovidhelp.in/addData', requestOptions)
        .then((res) => res.json())
        .then((result) => {
          console.log('response', result);
          if (result.success) {
            closeLoading();
            openSuccess();
            setTimeout(() => {
              resetAll();
              closeSuccess();
            }, 2000);
          } else {
            closeLoading();
            closeFailure();
            setTimeout(() => {
              closeFailure();
            }, 2000);
          }
        });
    } catch (err) {
      openFailure();
      closeLoading();
      setTimeout(() => {
        openFailure();
      }, 2000);
    }
  };

  const theme = {
    palette: {
      type: darkMode.value ? 'dark' : 'light',
    },
  };
  const themeConfig = createMuiTheme(theme);

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
