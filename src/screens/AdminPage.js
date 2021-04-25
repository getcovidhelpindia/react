// Components
import { Layout } from '../components/marginals';
import Table from '../components/Table';

function App({ darkMode }) {
  return (
    <Layout enableFab>
      <div class='container'>
        <header style={{ textAlign: 'center' }}>
          <h3 style={{ margin: '2%' }}>Admin Panel</h3>
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
