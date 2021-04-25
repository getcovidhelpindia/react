import React, { useState, useEffect } from 'react';

// Libraries
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from '@material-ui/core';

// CSS
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

// Components
import { InfoCellRenderer, CreatedAtCellRenderer } from 'components';

// Assets
import { StatesAndDistricts } from 'assets';

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
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}));

let shareArray = [];

const Table = ({ darkMode }) => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [indiaState, setIndiaState] = React.useState(-1);
  const [resourceType, setResourceType] = React.useState(-1);
  const onGridReady = (params) => {
    console.log('rowheight', params);
    params.api.resetRowHeights();
  };
  const theme = {
    palette: {
      type: darkMode.value ? 'dark' : 'light',
    },
  };
  const themeConfig = createMuiTheme(theme);

  const [darkThemeClassState, setDarkThemeClassState] = React.useState('');

  const handleChangeState = (event) => {
    setIndiaState(event.target.value);
  };
  const handleChangeResourceType = (event) => {
    setResourceType(event.target.value);
  };

  const onSelectionChanged = (event) => {
    shareArray = event.api.getSelectedNodes();
  };

  const customValueGetter = (params) => {
    return params.node.data.info;
  };
  const customValueGetterContact = (params, info) => {
    return params.node.data.contact;
  };

  // const customValueSetter = (params) => {
  // 	console.log(params);
  // 	params.data.isSelected = params.newValue;
  // 	return true;
  // };

  // const ShareCellRenderer = (props, data) => {
  // 	const classes = useStyles();
  // 	const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  // 	console.log(props);
  // 	return (
  // 		<Checkbox
  // 			className={classes.root}
  // 			disableRipple
  // 			color="default"
  // 			checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
  // 			onClick={(event) => console.log(event)}
  // 			icon={<span className={classes.icon} />}
  // 			inputProps={{ 'aria-label': 'decorative checkbox' }}
  // 		/>
  // 	);
  // };
  useEffect(() => {
    const themeClassName = darkMode.value
      ? 'ag-theme-alpine-dark'
      : 'ag-theme-alpine';
    setDarkThemeClassState(themeClassName);
    console.log(darkThemeClassState);
  }, [darkMode.value]);

  useEffect(() => {
    const payload = {
      type: resourceType,
      prefix: StatesAndDistricts?.states[indiaState]?.state.toLowerCase(),
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
    };
    if (indiaState >= 0 && resourceType >= 0) {
      setRowData(null);
      fetch('https://api.getcovidhelp.in/getData', requestOptions)
        .then((res) => res.json())
        .then((result) => {
          result.data.map((item) => {
            item.contact = `${item.info.name} <br/> <a href=tel:${item.info.contact}>${item.info.contact}</a> <br/> ${item.info.location}`;
            item.info = item.info.description;
            console.log(item.contact);
            item.isSelected = 0;
            return item;
          });
          const approvedData = result.data.filter((value, index, arr) => {
            return value.isApproved;
          });
          setRowData(approvedData);
          console.log('rowData', result.data);
        });
    }
  }, [indiaState, resourceType]);
  function AgGridTab() {
    const classes = useStyles();
    return (
      <>
        <ThemeProvider theme={themeConfig} style={{ height: '100rem' }}>
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
              Resources
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
        </ThemeProvider>
        <div style={{ height: '100vh' }}>
          <AgGridReact
            rowData={rowData}
            suppressRowClickSelection={true}
            rowSelection={'multiple'}
            rowHeight={200}
            onSelectionChanged={onSelectionChanged}
            // onGridReady={onGridReady}
            frameworkComponents={{
              infoCellRenderer: InfoCellRenderer,
              createdAtCellRenderer: CreatedAtCellRenderer,
              // shareCellRenderer: ShareCellRenderer,
            }}
          >
            <AgGridColumn
              field='district'
              filter='agTextColumnFilter'
              floatingFilter={true}
              sortable={true}
              checkboxSelection={true}
            ></AgGridColumn>
            {/* <AgGridColumn
						field="isSelected"
						cellRenderer="shareCellRenderer"
						// valueSetter={customValueSetter}
					></AgGridColumn> */}
            <AgGridColumn
              field='info'
              wrapText={true}
              minWidth={200}
              flex={5}
              filter='agTextColumnFilter'
              valueGetter={customValueGetter}
              cellRenderer='infoCellRenderer'
              editable={true}
              floatingFilter={true}
              sortable={true}
              cellEditor='agLargeTextCellEditor'
              // autoHeight={true}
            ></AgGridColumn>
            <AgGridColumn
              field='contact'
              filter='agTextColumnFilter'
              floatingFilter={true}
              sortable={true}
              editable={true}
              wrapText={true}
              flex={4}
              minWidth={160}
              cellEditor='agLargeTextCellEditor'
              // autoHeight={true}
              valueGetter={customValueGetterContact}
              cellRenderer='infoCellRenderer'
            ></AgGridColumn>
            <AgGridColumn
              field='createdAt'
              cellRenderer='createdAtCellRenderer'
              // filter="agTextColumnFilter"
              // floatingFilter={true}
              // sortable={true}
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </>
    );
  }
  return (
    <div
      style={{
        // display: 'flex',
        // flexDirection: 'column',
        minHeight: '40rem',
        width: '85%',
        marginLeft: '10%',
        marginTop: '2%',
        marginBottom: '5%',
        marginRight: '3%',
      }}
      className={darkThemeClassState}
    >
      <AgGridTab />
    </div>
  );
};

export const FABClick = () => {
  let shareString = '';
  console.log(shareArray);
  for (let row of shareArray) {
    shareString = shareString + `${row.data.info} at ${row.data.district} \n`;
  }
  const shareStringEncoded = encodeURIComponent(
    `Sharing useful resource info about COVID19 from https://getcovidhelp.in/ \n ${shareString}`
  );
  if (navigator.share) {
    console.log('ab');
    navigator
      .share({
        title: 'Get COVID Help India',
        text: `Sharing useful resource info about COVID19 \n ${shareString}`,
        url: 'https://getcovidhelp.in/',
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  } else {
    window.open(`https://twitter.com/intent/tweet?text=${shareStringEncoded}`);
  }
};

export default Table;
