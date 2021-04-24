import Table, { FABClick } from './components/TableAdmin';
import Footer from './components/Footer';
import Fab from '@material-ui/core/Fab';
import { Share } from 'react-feather';

function App({ darkMode }) {
	return (
		<div class="container">
			<header style={{ textAlign: 'center' }}>
				<h3 style={{ margin: '2%' }}>Admin Panel</h3>
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
