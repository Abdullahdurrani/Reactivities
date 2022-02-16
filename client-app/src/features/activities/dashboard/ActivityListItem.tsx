import { NavLink } from 'react-router-dom';
import { Activity } from '../../../app/models/Activity';
import { Clock, Location } from '../../../assets/Svg';

interface Props {
	activity: Activity;
}

function ActivityListItem({ activity }: Props) {
	return (
		<div key={activity.id} className='card mb-3'>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item head d-flex flex-row'>
					<img
						className='card-img rounded-circle'
						src={require('../../../assets/user.png')}
						alt='userimg'
					/>
					<span className='p-2 ps-3'>
						<h4>{activity.title}</h4>
						<h6>Hosted By bob</h6>
					</span>
				</li>
				<li className='list-group-item p-3'>
					<span>
						<img src={Clock} alt='' className='pe-1' /> {activity.date}
					</span>
					<span className='p-4'>
						<img src={Location} alt='' /> {activity.venue}
					</span>
				</li>
				<li className='attendees list-group-item'>Attendees go here </li>
				<li className='list-group-item d-flex justify-content-between pt-3'>
					<span>{activity.description}</span>
					<span>
						<NavLink to={`/activities/${activity.id}`}>
							<button type='button' className='btn btn-primary me-2'>
								View
							</button>
						</NavLink>
					</span>
				</li>
			</ul>
		</div>
	);
}

export default ActivityListItem;
