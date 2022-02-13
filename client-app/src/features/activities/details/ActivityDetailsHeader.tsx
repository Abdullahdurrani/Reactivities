import { observer } from 'mobx-react-lite';
import { Activity } from '../../../app/models/Activity';

interface Props {
	activity: Activity;
}

function ActivityDetailsHeader({ activity }: Props) {
	return (
		<div>
			<div className='card det-thumb'>
				<img
					src={require(`../../../assets/categoryImages/${activity.category}.jpg`)}
					className='card-img-top det-img'
					alt='...'
				/>
				<div className='card-body det-caption'>
					<h4 className='card-title'>{activity.title} </h4>
					<p className='card-text'>{activity.date}</p>
					<p className='card-text'>Hosted by Bob</p>
				</div>
				<div className='card-body d-flex justify-content-between'>
					<div>
						<button className='btn btn-primary me-1'>Join Activity</button>
						<button className='btn btn-secondary'>Cancel Attendance</button>
					</div>
					<div>
						<button className='btn btn-danger'>Manage Event</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default observer(ActivityDetailsHeader);
