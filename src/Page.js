import Table, { FABClick } from './components/Table';
import Footer from './components/Footer';
import Fab from '@material-ui/core/Fab';
import { Share } from 'react-feather';

function App({ darkMode }) {
	return (
		<div class="container">
			<header style={{ textAlign: 'center' }}>
				<h5 style={{ margin: '2%' }}>
					A consolidated list of resources to aid in combating COVID-19 in India. To know more, visit the{' '}
					<a href="/about">About Section</a>
				</h5>
			</header>
			<Table darkMode={darkMode} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }} />
			<Footer style={{ top: 'auto' }} />
			<Fab
				color="primary"
				aria-label="add"
				style={{ position: 'fixed', right: '1rem', bottom: '1rem' }}
				onClick={FABClick}
			>
				<Share />
			</Fab>
		</div>
	);
}

export default App;
