import { useState, useEffect } from 'react';

// Libraries
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

// Components
import { Layout, Table, SelectStateDisctrict } from 'components';

// Hooks
import { useInput, useTheme } from 'hooks';

// Assets
import { StatesAndDistricts } from 'assets';

function App({ darkMode }) {
  const [indiaState, setIndiaState] = useInput('');
  const [resourceType, setResourceType] = useInput('');
  const [rowData, setRowData] = useState([]);
  const [shareArray, setShareArray] = useState([]);

  const themeConfig = useTheme(darkMode);

  useEffect(() => {
    const payload = {
      type: resourceType,
      prefix: StatesAndDistricts?.states[indiaState]?.state.toLowerCase(),
    };

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const fetchData = async () => {
      try {
        const { data } = await fetch(
          'https://api.getcovidhelp.in/getData',
          requestOptions
        ).then((res) => res.json());

        const approvedData = data
          .filter((item) => item.isApproved)
          .map((item) => ({
            ...item,
            contact: `${item.info.name} <br/> <a href=tel:${item.info.contact}>${item.info.contact}</a> <br/> ${item.info.location}`,
            info: item.info.description,
            isSelected: 0,
          }));

        setRowData(approvedData);
      } catch (error) {
        console.log(error);
      }
    };

    if (parseInt(indiaState) >= 0 && parseInt(resourceType) >= 0) {
      setRowData(null);
      fetchData();
    }
  }, [indiaState, resourceType]);

  const classes = useStyles();
  return (
    <Layout enableFab shareArray={shareArray}>
      <ThemeProvider theme={themeConfig}>
        <div className={`container ${classes.screen}`}>
          <header style={{ textAlign: 'center' }}>
            <h5 style={{ margin: '2%' }}>
              A consolidated list of resources to aid in combating COVID-19 in
              India. To know more, visit the <a href='/about'>About Section</a>
            </h5>
          </header>

          <SelectStateDisctrict
            {...{
              indiaState,
              setIndiaState,
              resourceType,
              setResourceType,
              showDistrict: false,
            }}
          />

          <Table
            {...{
              darkMode,
              rowData,
              setShareArray,
            }}
          />
        </div>
      </ThemeProvider>
    </Layout>
  );
}

export default App;

const useStyles = makeStyles(() => ({
  screen: {
    minHeight: '40rem',
    width: '85%',
    marginLeft: '10%',
    marginTop: '2%',
    marginBottom: '5%',
    marginRight: '3%',
  },
}));
