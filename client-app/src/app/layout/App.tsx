import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';

function App() {
	// from edit to create doesn't clear the fields this makes sure that those fields are cleared
	const location = useLocation();
	return (
		<>
			<Route exact path={'/'} component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<NavBar />
						<div className='container mt-4'>
							<Route exact path={'/activities'} component={ActivityDashboard} />
							<Route exact path={'/activities/:id'} component={ActivityDetails} />
							<Route
								exact
								key={location.key}
								path={['/createActivity', '/manage/:id']}
								component={ActivityForm}
							/>
						</div>
					</>
				)}
			/>
		</>
	);
}

export default observer(App);
