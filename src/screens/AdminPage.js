import { useState, useEffect } from 'react';

// Libraries
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

// Components
import { Layout, TableAdmin, SelectStateDisctrict } from 'components';

// Hooks
import { useInput, useTheme } from 'hooks';

// Assets
import { StatesAndDistricts } from 'assets';

function AdminPage({ darkMode }) {
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
          requestOptions,
        ).then((res) => res.json());

        const approvedData = data.map((item) => ({
          ...item,
          // eslint-disable-next-line max-len
          contact: `${item.info.name} \n ${item.info.contact} \n ${item.info.location}`,
          info: item.info.description,
          isSelected: 0,
        }));

        setRowData(approvedData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    if (parseInt(indiaState, 10) >= 0 && parseInt(resourceType, 10) >= 0) {
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
            <h3 style={{ margin: '2%' }}>Admin Panel</h3>
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

          <TableAdmin
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

export default AdminPage;

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
