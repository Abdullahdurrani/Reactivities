import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

function ServerError() {
	const { commonStore } = useStore();
	return (
		<div className='container'>
			<h2>
				Server Error: <span className='text-danger'>{commonStore.error?.statusCode}</span>
			</h2>
			{/* error is possibly null so ? */}
			<h5 className='text-danger'>{commonStore.error?.message}</h5>
			{commonStore.error?.details && (
				<div className='bg-light p-4'>
					<h4 className='text-secondary'>Stack Trace</h4>
					<code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
				</div>
			)}
		</div>
	);
}

export default observer(ServerError);
