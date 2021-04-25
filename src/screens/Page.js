// Components
import { Layout } from '../components/marginals';
import Table from '../components/Table';

function App({ darkMode }) {
  return (
    <Layout enableFab>
      <div class='container'>
        <header style={{ textAlign: 'center' }}>
          <h5 style={{ margin: '2%' }}>
            A consolidated list of resources to aid in combating COVID-19 in
            India. To know more, visit the <a href='/about'>About Section</a>
          </h5>
        </header>
        <Table
          darkMode={darkMode}
          style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
        />
      </div>
    </Layout>
  );
}

export default App;
