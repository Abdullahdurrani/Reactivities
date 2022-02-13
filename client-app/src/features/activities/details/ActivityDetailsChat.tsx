import { observer } from 'mobx-react-lite';

function ActivityDetailsChat() {
	return (
		<div className='card mb-3 mt-3'>
			<ul className='list-group list-group-flush'>
				<h5 className='card-header text-center bg-secondary text-white pe-5'>Chat</h5>
				<li className='d-flex flex-column'>
					<span className='list-group-item d-flex flex-row'>
						<img className='card-img chat-img' src={require('../../../assets/user.png')} alt='' />
						<span className='d-flex flex-column'>
							<span className='pt-2'>
								<span className='msg-person'>Abd</span>
								<span className='ps-2 text-secondary chat-date'>Today at 5:30PM</span>
							</span>
							<span className='msg-body'>Message body</span>
							<span>
								<button className='btn btn-link msg-reply'>Reply</button>
							</span>
						</span>
					</span>
					<span className='list-group-item d-flex flex-row'>
						<img className='card-img chat-img' src={require('../../../assets/user.png')} alt='' />
						<span className='d-flex flex-column'>
							<span className='pt-2'>
								<span className='msg-person'>ahti</span>
								<span className='ps-2 text-secondary chat-date'>Today at 1:30AM</span>
							</span>
							<span className='msg-body'>Message Second</span>
							<span>
								<button className='btn btn-link msg-reply'>Reply</button>
							</span>
						</span>
					</span>
					<span>
						<textarea className='form-control' id='exampleFormControlTextarea1' rows={3}></textarea>
						<button className='btn btn-primary mt-2'>Add Reply</button>
					</span>
				</li>
			</ul>
		</div>
	);
}
export default observer(ActivityDetailsChat);
