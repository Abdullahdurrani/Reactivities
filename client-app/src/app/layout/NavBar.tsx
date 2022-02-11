import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';

export default function NavBar() {
	return (
		<div>
			<nav className='navbar navbar-expand-lg navbar-dark bg-info '>
				<div className='container'>
					<ul className='nav'>
						<li className='nav-item ms-3'>
							<img src={Logo} width={40} alt='logo' />
						</li>
						<li className='nav-item'>
							<NavLink exact to='/' className='nav-link text-white navbar-brand'>
								Reactivities
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink to='/activities' className='nav-link text-white'>
								Reactivities
							</NavLink>
						</li>
						<li className='nav-item ms-3'>
							<NavLink exact to='/createActivity'>
								<button type='button' className='btn btn-secondary'>
									Create Activity
								</button>
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}
