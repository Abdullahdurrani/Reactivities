import { Link } from 'react-router-dom';

function HomePage() {
	return (
		<div className='container mt-5 p-5'>
			<h4>Home Page</h4>
			<h5>
				Go to <Link to='/activities'>Activities</Link>
			</h5>
		</div>
	);
}
export default HomePage;
