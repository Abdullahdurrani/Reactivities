import { NavLink } from 'react-router-dom';

function NotFound() {
	return (
		<div className='container text-center pt-5 bg-light pb-5 mt-4'>
			<h4>Could not find this</h4>
			<NavLink to='/activities'>
				<button type='button' className='btn btn-primary mt-3'>
					Return to Activities page
				</button>
			</NavLink>
		</div>
	);
}
export default NotFound;
