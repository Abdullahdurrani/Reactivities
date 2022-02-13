import { observer } from 'mobx-react-lite';

function ActivityDetailsSidebar() {
	return (
		<div className='card'>
			<ul className='list-group list-group-flush'>
				<li className='card-header text-white text-center bg-secondary'>3 People Going</li>
				<li className='list-group-item'>
					<span className='badge bg-danger host float-end'>Host</span>
					<span className='d-flex flex-row'>
						<img className='sidebar-img w-25' src={require('../../../assets/user.png')} alt='' />

						<span className='d-flex flex-column'>
							<button type='button' className='sidebar-person btn btn-Link'>
								Person
							</button>
							<button type='button' className='follow-person btn btn-Link'>
								Following
							</button>
						</span>
					</span>
					<hr />
					<span className='d-flex flex-row'>
						<img className='sidebar-img w-25' src={require('../../../assets/user.png')} alt='' />
						<span className='d-flex flex-column'>
							<button type='button' className='sidebar-person btn btn-Link'>
								Bob
							</button>
							<button type='button' className='follow-person btn btn-Link'>
								Following
							</button>
						</span>
					</span>
					<hr />
					<span className='d-flex flex-row'>
						<img className='sidebar-img w-25' src={require('../../../assets/user.png')} alt='' />
						<span className='d-flex flex-column'>
							<button type='button' className='sidebar-person btn btn-Link'>
								Nigga
							</button>
						</span>
					</span>
				</li>
			</ul>
		</div>
	);
}
export default observer(ActivityDetailsSidebar);
