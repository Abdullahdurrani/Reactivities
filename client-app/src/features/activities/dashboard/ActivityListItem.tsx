import { SyntheticEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';

interface Props {
	activity: Activity;
}

function ActivityListItem({ activity }: Props) {
	const { activityStore } = useStore();
	const { deleteActivity, loading } = activityStore;
	// contains the name of the button clicked
	const [target, setTarget] = useState('');

	function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	}
	return (
		<div key={activity.id} className='card'>
			<div className='card-body'>
				<h5 className='card-title'>{activity.title}</h5>
				<p className='card-title'>{activity.date}</p>
				<h5 className='card-title'>{activity.description}</h5>
				<h5 className='card-title'>{activity.city}</h5>

				<div className='d-flex justify-content-between'>
					<h5>
						<span className='badge bg-light text-dark bg-outline-primary'>{activity.category}</span>
					</h5>
					<div>
						<NavLink to={`/activities/${activity.id}`}>
							<button type='button' className='btn btn-primary me-2'>
								View
							</button>
						</NavLink>
						<NavLink to={`/manage/${activity.id}`}>
							<button type='button' className='btn btn-secondary me-2'>
								Edit
							</button>
						</NavLink>
						<button
							name={activity.id}
							onClick={(e) => handleActivityDelete(e, activity.id)}
							type='button'
							className='btn btn-danger'
						>
							Delete
							{loading && target === activity.id && (
								<span
									className='spinner-border spinner-border-sm ms-2'
									role='status'
									aria-hidden='true'
								></span>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ActivityListItem;
