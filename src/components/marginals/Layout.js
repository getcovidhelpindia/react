// Libraries
import { Fab } from '@material-ui/core';
import { Share } from 'react-feather';

// Components
import { Footer } from 'components';

// Utils
import { FABClick } from 'utils';

const Layout = ({
  children,
  footerClassName,
  enableFab = false,
  shareArray,
}) => (
  <>
    {children}

    <Footer className={footerClassName || ''} />

    {enableFab && (
      <Fab
        color='primary'
        aria-label='add'
        style={{ position: 'fixed', right: '1rem', bottom: '1rem' }}
        onClick={() => FABClick(shareArray)}
      >
        <Share />
      </Fab>
    )}
  </>
);

export default Layout;
