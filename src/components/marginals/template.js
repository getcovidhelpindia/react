// Libraries
import Fab from '@material-ui/core/Fab';
import { Share } from 'react-feather';

// Components
import Footer from './Footer';
import { FABClick } from '../Table';

const Template = ({ children, footerClassName, enableFab = false }) => {
  return (
    <>
      {children}

      <Footer className={footerClassName ? footerClassName : ''} />

      {enableFab && (
        <Fab
          color='primary'
          aria-label='add'
          style={{ position: 'fixed', right: '1rem', bottom: '1rem' }}
          onClick={FABClick}
        >
          <Share />
        </Fab>
      )}
    </>
  );
};

export default Template;
