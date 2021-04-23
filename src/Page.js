import Table, { FABClick } from './components/Table';
import Footer from './components/Footer';
import Fab from '@material-ui/core/Fab';
import { Share } from 'react-feather';

function App({ darkMode }) {
	return (
		<>
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
		</>
	);
}

export default App;
