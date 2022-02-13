import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { CSVLink } from 'react-csv';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList() {
	const { activityStore } = useStore();
	const { groupedActivities, activitiesArray } = activityStore;

	const headers = [
		{ label: 'ID', key: 'id' },
		{ label: 'Title', key: 'title' },
		{ label: 'Date', key: 'date' },
		{ label: 'Description', key: 'description' },
		{ label: 'Category', key: 'category' },
		{ label: 'City', key: 'city' },
		{ label: 'Venue', key: 'venue' },
	];

	const csvReport = {
		filename: 'Activities.csv',
		headers: headers,
		data: activitiesArray,
	};
	return (
		<>
			<div>
				<button type='button' className='btn btn-success mb-4'>
					<CSVLink {...csvReport} className='text-white csv'>
						Export to CSV
					</CSVLink>
				</button>
			</div>
			{groupedActivities.map(([group, activities]) => (
				<Fragment key={group}>
					<h4 className='text-muted'>{group}</h4>
					<div className='mb-4'>
						{activities.map((activity) => (
							<ActivityListItem key={activity.id} activity={activity} />
						))}
					</div>
				</Fragment>
			))}
		</>
	);
});
