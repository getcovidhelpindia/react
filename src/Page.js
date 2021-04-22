import Table, { FABClick } from './components/Table';
import Footer from './components/Footer';
import Fab from '@material-ui/core/Fab';

function App({ darkMode }) {
	return (
		<>
			<Table darkMode={darkMode} />
			<Footer />
			<Fab
				color="primary"
				aria-label="add"
				style={{ position: 'fixed', right: '1rem', bottom: '1rem' }}
				onClick={FABClick}
			>
				A
			</Fab>
		</>
	);
}

export default App;
