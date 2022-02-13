import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';
function ActivityDetails() {
	const { activityStore } = useStore();
	const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
	// get id from parameter
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) loadActivity(id);
	}, [id, loadActivity]);

	// to remove the error of undefined
	if (loadingInitial || !activity) return <LoadingComponent />;
	return (
		<div className='row'>
			<div className='col-6 ms-5 me-3'>
				<ActivityDetailsHeader activity={activity} />
				<ActivityDetailsInfo activity={activity} />
				<ActivityDetailsChat />
			</div>
			<div className='col-4'>
				<ActivityDetailsSidebar />
			</div>
		</div>
	);
}

export default observer(ActivityDetails);
