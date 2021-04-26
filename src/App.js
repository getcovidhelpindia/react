import 'App.scss';

// Libraries
import { lazy, Suspense } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

// Components
import { Navbar } from 'components';

// Utilities
import { retry } from 'utils';

// Lazy load components: Code Splitting
const Home = lazy(() => retry(() => import('screens/Page')));
const AddInfo = lazy(() => retry(() => import('screens/AddInfo')));
const About = lazy(() => retry(() => import('screens/About')));
const Admin = lazy(() => retry(() => import('screens/AdminPage')));

const App = () => {
  const darkMode = useDarkMode(false);
  const location = useLocation();

  const pages = [
    {
      pageLink: '/',
      view: Home,
      displayName: 'Home',
      showInNavbar: true,
    },
    {
      pageLink: '/addInfo',
      view: AddInfo,
      displayName: 'Add Info',
      showInNavbar: true,
    },
    {
      pageLink: '/about',
      view: About,
      displayName: 'About',
      showInNavbar: true,
    },
    {
      pageLink: '/admin',
      view: Admin,
      displayName: 'Admin',
      showInNavbar: false,
    },
  ];

  return (
    <div className='App'>
      <Navbar pages={pages} {...{ darkMode }} />

      <Suspense fallback={<div />}>
        <Switch location={location}>
          {pages.map((page, index) => {
            return (
              <Route
                exact
                path={page.pageLink}
                render={({ match }) => <page.view darkMode={darkMode} />}
                key={index}
              />
            );
          })}
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
