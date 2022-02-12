import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {
	const { activityStore } = useStore();
	const { loadActivities, activityRegistry } = activityStore;

	useEffect(() => {
		// to stop api request on going to dashboard every time
		if (activityRegistry.size <= 1) loadActivities();
	}, [activityRegistry.size, loadActivities]);

	// on page start loading is true so LoadingComponent is returned
	if (activityStore.loadingInitial) return <LoadingComponent />;

	return (
		<div className='row'>
			<div className='col-8'>
				<ActivityList />
			</div>
			<div className='col-4'>
				<h2>Activity Filter</h2>
			</div>
		</div>
	);
});
