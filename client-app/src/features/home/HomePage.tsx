import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';
function HomePage() {
	return (
		<div className='home d-flex flex-column min-vh-100 justify-content-center'>
			<div className='d-flex flex-row mb-3'>
				<img src={Logo} alt='' className='home-img' />
				<h1 className='home-header'>Reactivities</h1>
			</div>
			<div className='me-5 mb-2'>
				<h4>Welcome to Reactivities</h4>
			</div>
			<div className='me-5'>
				<NavLink to='/login' className='home-nav'>
					<button type='button' className='btn btn-outline-light home-btn'>
						Login
					</button>
				</NavLink>
			</div>
		</div>
	);
}
export default HomePage;
