import './App.scss';
import Navbar from './components/Navbar';
import { retry } from './utils/commonFunctions';

import { lazy, useState, Suspense, useEffect } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

const Home = lazy(() => retry(() => import('./Page')));
const AddInfo = lazy(() => retry(() => import('./AddInfo')));
const About = lazy(() => retry(() => import('./components/About')));
//const State = lazy(() => retry(() => import('./components/State')));

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
	];

	return (
		<div className="App">
			<Navbar pages={pages} {...{ darkMode }} />

			<Suspense fallback={<div />}>
				<Switch location={location}>
					{pages.map((page, index) => {
						return (
							<Route exact path={page.pageLink} render={({ match }) => <page.view darkMode={darkMode} />} key={index} />
						);
					})}
					<Redirect to="/" />
				</Switch>
			</Suspense>
		</div>
	);
};

export default App;
