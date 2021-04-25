import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Footer from './components/Footer';
import { StatesAndDistricts } from './assets';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import ReCAPTCHA from 'react-google-recaptcha';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function MultilineTextFields({ darkMode }) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [info, setInfo] = React.useState('');
  const [source, setSource] = React.useState('');
  const [indiaState, setIndiaState] = React.useState(-1);
  const [indiaDistrict, setIndiaDistrict] = React.useState(-1);
  const [resourceType, setResourceType] = React.useState(-1);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonFailure]: failure,
  });

  const handleChangeState = (event) => {
    setIndiaState(event.target.value);
    setIndiaDistrict(-1);
  };
  const handleChangeDistrict = (event) => {
    setIndiaDistrict(event.target.value);
  };
  const handleChangeResourceType = (event) => {
    setResourceType(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeContact = (event) => {
    setContact(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeInfo = (event) => {
    setInfo(event.target.value);
  };
  const handleChangeSource = (event) => {
    setSource(event.target.value);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
  };
  const dataSubmit = (event) => {
    if (!loading) {
      setLoading(true);
    }
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
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
              setName('');
              setContact('');
              setLocation('');
              setInfo('');
              setSource('');
              setIndiaState(-1);
              setIndiaDistrict(-1);
              setResourceType(-1);
              setSuccess(false);
            }, 2000);
          } else {
            setLoading(false);
            setFailure(true);
            setTimeout(() => {
              setFailure(false);
            }, 2000);
          }
        });
    } catch (err) {
      setFailure(true);
      setLoading(false);
      setTimeout(() => {
        setFailure(false);
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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ThemeProvider theme={themeConfig}>
        <div
          style={{
            height: '40rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            marginLeft: '10%',
            marginTop: '2%',
            marginBottom: '10%',
          }}
        >
          <div>
            <FormControl
              required
              variant='outlined'
              className={classes.formControl}
            >
              <InputLabel id='demo-simple-select-required-label'>
                State
              </InputLabel>
              <Select
                labelId='demo-simple-select-required-label'
                id='demo-simple-select-required'
                value={indiaState}
                onChange={handleChangeState}
                className={classes.selectEmpty}
              >
                <MenuItem value={-1}>
                  <em>None</em>
                </MenuItem>
                {StatesAndDistricts.states.map((item, index) => (
                  <MenuItem value={index}>{item.state}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl
              required
              variant='outlined'
              className={classes.formControl}
            >
              <InputLabel id='demo-simple-select-required-label'>
                District
              </InputLabel>
              <Select
                labelId='demo-simple-select-required-label'
                id='demo-simple-select-required'
                value={indiaDistrict}
                onChange={handleChangeDistrict}
                className={classes.selectEmpty}
              >
                <MenuItem value={-1}>
                  <em>None</em>
                </MenuItem>
                {indiaState >= 0 ? (
                  StatesAndDistricts.states[
                    indiaState
                  ].districts.map((item, index) => (
                    <MenuItem value={index}>{item}</MenuItem>
                  ))
                ) : (
                  <div />
                )}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl
              required
              variant='outlined'
              className={classes.formControl}
            >
              <InputLabel id='demo-simple-select-required-label'>
                Resource Type
              </InputLabel>
              <Select
                labelId='demo-simple-select-required-label'
                id='demo-simple-select-required'
                value={resourceType}
                onChange={handleChangeResourceType}
                className={classes.selectEmpty}
              >
                <MenuItem value={-1}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>Oxygen</MenuItem>
                <MenuItem value={1}>Medicines</MenuItem>
                <MenuItem value={2}>Plasma Donor</MenuItem>
                <MenuItem value={3}>Hospital Bed</MenuItem>
                <MenuItem value={4}>Testing Facility</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </div>
          <form
            className={classes.root}
            noValidate
            autoComplete='off'
            onSubmit={handleSubmitForm}
          >
            <TextField
              id='outlined-multiline-flexible'
              label='Name'
              value={name}
              onChange={handleChangeName}
              variant='outlined'
            />
            <TextField
              id='outlined-multiline-flexible'
              label='Contact'
              value={contact}
              onChange={handleChangeContact}
              variant='outlined'
            />
            <TextField
              id='outlined-multiline-flexible'
              label='Location'
              value={location}
              onChange={handleChangeLocation}
              variant='outlined'
            />
          </form>
          <form
            className={classes.root}
            noValidate
            autoComplete='off'
            onSubmit={handleSubmitForm}
          >
            <TextField
              id='outlined-multiline-flexible'
              label='Information'
              value={info}
              onChange={handleChangeInfo}
              variant='outlined'
            />
          </form>
          <form
            className={classes.root}
            noValidate
            autoComplete='off'
            onSubmit={handleSubmitForm}
          >
            <TextField
              id='outlined-multiline-flexible'
              label='Source'
              value={source}
              onChange={handleChangeSource}
              variant='outlined'
            />
          </form>
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
      <Footer style={{ top: 'auto' }} />
    </div>
  );
}
