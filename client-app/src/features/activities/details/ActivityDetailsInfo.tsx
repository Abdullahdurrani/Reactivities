import { observer } from 'mobx-react-lite';
import { Activity } from '../../../app/models/Activity';
import { Location, Tag, Info, Calendar } from '../../../assets/Svg';

interface Props {
	activity: Activity;
}

function ActivityDetailsInfo({ activity }: Props) {
	return (
		<div className='card mt-3'>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item'>
					{' '}
					<img src={Tag} alt='' className='pe-3' />
					{activity.category}
				</li>
				<li className='list-group-item'>
					<img src={Calendar} alt='' className='pe-3' />
					{activity.date}
				</li>
				<li className='list-group-item'>
					<img src={Location} alt='' className='pe-3' />
					{activity.city}, {activity.venue}
				</li>
				<li className='list-group-item'>
					<img src={Info} alt='' className='pe-3' />
					{activity.description}
				</li>
			</ul>
		</div>
	);
}
export default observer(ActivityDetailsInfo);
