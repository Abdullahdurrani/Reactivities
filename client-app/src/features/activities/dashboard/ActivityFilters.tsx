import { observer } from 'mobx-react-lite';
import Calendar from 'react-calendar';
import { Filter } from '../../../assets/Svg';

function ActivityFilters() {
	return (
		<div>
			<div className='container-fluid filter'>
				<ul className='navbar-nav mb-4'>
					<li className='nav-item list-group-item '>
						<img src={Filter} alt='' className='me-3' />
						<span className='text-secondary'>Filters</span>
					</li>
					<li className='nav-item list-group-item'>
						<a className='nav-link' href='#s'>
							All Activities
						</a>
					</li>
					<li className='nav-item list-group-item'>
						<a className='nav-link' href='#s'>
							I'm Going
						</a>
					</li>
					<li className='nav-item list-group-item'>
						<a className='nav-link' href='#s'>
							I'm Hosting
						</a>
					</li>
				</ul>
				<Calendar />
			</div>
		</div>
	);
}
export default observer(ActivityFilters);
