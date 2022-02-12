import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
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
		<div className='card' style={{ width: '24rem' }}>
			<img
				className='card-img-top'
				src={require(`../../../assets/categoryImages/${activity.category}.jpg`)}
				alt='image1'
			/>
			<div className='card-body'>
				<h5 className='card-title'>{activity.title} </h5>
				<p className='card-text'>{activity.date}</p>
				<p className='card-text'>{activity.description}</p>
				<p className='card-text'>
					{activity.city}, <span>{activity.venue}</span>
				</p>
				<p className='card-text'>{activity.category}</p>
			</div>
			<div className='card-body d-flex'>
				<NavLink to={`/manage/${activity.id}`}>
					<button type='button' className='btn btn-primary me-2'>
						Edit
					</button>
				</NavLink>

				<NavLink to='/activities'>
					<button type='button' className='btn btn-secondary'>
						Cancel
					</button>
				</NavLink>
			</div>
		</div>
	);
}

export default observer(ActivityDetails);
