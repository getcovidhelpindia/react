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
import { StateAndDistrict } from './utils/statesAndDistrict';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
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
	console.log(StateAndDistrict.states.length);
	const classes = useStyles();
	const [name, setName] = React.useState('');
	const [contact, setContact] = React.useState('');
	const [location, setLocation] = React.useState('');
	const [info, setInfo] = React.useState('');
	const [source, setSource] = React.useState('');
	const [indiaState, setIndiaState] = React.useState(-1);
	const [indiaDistrict, setIndiaDistrict] = React.useState(-1);
	const [resourceType, setResourceType] = React.useState(-1);
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
		const payload = {
			state: StateAndDistrict.states[indiaState].state,
			district: StateAndDistrict.states[indiaState].districts[indiaDistrict],
			type: resourceType.toString(),
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
			Usefulness: 0,
			isHidden: false,
		};
		console.log(JSON.stringify(payload));
		const requestOptions = {
			method: 'POST',
			body: JSON.stringify(payload),
		};
		fetch('https://api.getcovidhelp.in/addData', requestOptions)
			.then((res) => res.json())
			.then((result) => console.log(result));
	};
	const theme = {
		palette: {
			type: darkMode.value ? 'dark' : 'light',
		},
	};

	const themeConfig = createMuiTheme(theme);

	return (
		<>
			<ThemeProvider theme={themeConfig}>
				<div style={{ height: '30rem', width: '85%', marginLeft: '10%', marginTop: '2%', marginRight: '3%' }}>
					<FormControl required variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-required-label">State</InputLabel>
						<Select
							labelId="demo-simple-select-required-label"
							id="demo-simple-select-required"
							value={indiaState}
							onChange={handleChangeState}
							className={classes.selectEmpty}
						>
							<MenuItem value={-1}>
								<em>None</em>
							</MenuItem>
							{StateAndDistrict.states.map((item, index) => (
								<MenuItem value={index}>{item.state}</MenuItem>
							))}
						</Select>
						<FormHelperText>Required</FormHelperText>
					</FormControl>

					<FormControl required variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-required-label">District</InputLabel>
						<Select
							labelId="demo-simple-select-required-label"
							id="demo-simple-select-required"
							value={indiaDistrict}
							onChange={handleChangeDistrict}
							className={classes.selectEmpty}
						>
							<MenuItem value={-1}>
								<em>None</em>
							</MenuItem>
							{indiaState >= 0 ? (
								StateAndDistrict.states[indiaState].districts.map((item, index) => (
									<MenuItem value={index}>{item}</MenuItem>
								))
							) : (
								<div />
							)}
						</Select>
						<FormHelperText>Required</FormHelperText>
					</FormControl>

					<FormControl required variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-required-label">Resource Type</InputLabel>
						<Select
							labelId="demo-simple-select-required-label"
							id="demo-simple-select-required"
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

					<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmitForm}>
						<TextField
							id="outlined-multiline-flexible"
							label="Name"
							value={name}
							onChange={handleChangeName}
							variant="outlined"
						/>
						<TextField
							id="outlined-multiline-flexible"
							label="Contact"
							value={contact}
							onChange={handleChangeContact}
							variant="outlined"
						/>
						<TextField
							id="outlined-multiline-flexible"
							label="Location"
							value={location}
							onChange={handleChangeLocation}
							variant="outlined"
						/>
					</form>
					<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmitForm}>
						<TextField
							id="outlined-multiline-flexible"
							label="Information"
							value={info}
							onChange={handleChangeInfo}
							variant="outlined"
						/>
					</form>
					<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmitForm}>
						<TextField
							id="outlined-multiline-flexible"
							label="Source"
							value={source}
							onChange={handleChangeSource}
							variant="outlined"
						/>
					</form>
					<Button variant="contained" color="primary" onClick={dataSubmit}>
						Submit
					</Button>
				</div>
			</ThemeProvider>
			<Footer />
		</>
	);
}
