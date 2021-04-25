// Libraries
import { Fab } from '@material-ui/core';
import { Share } from 'react-feather';

// Components
import { Footer, FABClick } from 'components';

const Layout = ({ children, footerClassName, enableFab = false }) => (
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

export default Layout;
