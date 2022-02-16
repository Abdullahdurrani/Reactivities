import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import TestErrors from '../../features/errors/TestError';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';

function App() {
	// from edit to create doesn't clear the fields this makes sure that those fields are cleared
	const location = useLocation();
	return (
		<>
			<ToastContainer position='bottom-right' hideProgressBar />
			<Route exact path={'/'} component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<NavBar />
						<div className='container mt-4'>
							<Switch>
								<Route exact path={'/activities'} component={ActivityDashboard} />
								<Route exact path={'/activities/:id'} component={ActivityDetails} />
								<Route
									exact
									key={location.key}
									path={['/createActivity', '/manage/:id']}
									component={ActivityForm}
								/>
								<Route exact path='/errors' component={TestErrors} />
								<Route exact path='/server-error' component={ServerError} />
								<Route component={NotFound} />
							</Switch>
						</div>
					</>
				)}
			/>
		</>
	);
}

export default observer(App);
