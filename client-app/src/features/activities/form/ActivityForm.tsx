import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

function ActivityForm() {
	const history = useHistory();
	const { activityStore } = useStore();
	const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
	const { id } = useParams<{ id: string }>();

	const [activity, setActivity] = useState({
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: '',
	});

	// to check if there is an id passed in param
	// if there is loadActivity(from memory or api) setActivity then
	// if id is null activity is already populated in useState with initial fields
	useEffect(() => {
		if (id) loadActivity(id).then((activity) => setActivity(activity!));
	}, [id, loadActivity]);

	function handleSubmit(e: FormEvent) {
		// disables auto re renders
		e.preventDefault();
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid(),
			};
			createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
		} else {
			updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
		}
	}

	// event can be of input or textarea
	function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		// destructuring properties => gets name and value attribute from input element and creates their variables (their specific names matter e.g names will not work because it is not an attribute of input element)
		const { name, value } = event.target;
		// ...activity unpacks all properties and [name] finds the property and sets its value to 'value' variable, name and variable are created above using destructuring props
		setActivity({ ...activity, [name]: value });
	}

	// OR a different approach
	function handleInput(key: string, value: any) {
		setActivity((activity) => ({ ...activity, [key]: value }));
	}

	// OR third approach with typed safety
	// function handleChange<TKey extends keyof Obj>(key: TKey, value: Obj[TKey]) {
	//     setActivity(activity => ({...activity, [key]: value}));
	// }

	if (loadingInitial) return <LoadingComponent content='Loading activity' />;

	return (
		<div className='p-3 border mt-2' style={{ width: '24rem' }}>
			<form onSubmit={handleSubmit} autoComplete='off' className='me-4 mt-2'>
				<div className='mb-3'>
					{/* onchange changes the value of title property and that changed property is put into value */}
					<input
						type='text'
						placeholder='Title'
						className='form-control'
						name='title'
						value={activity.title}
						onChange={handleInputChange}
					/>
				</div>
				<div className='mb-3'>
					<textarea
						placeholder='Description'
						className='form-control'
						rows={3}
						name='description'
						value={activity.description}
						onChange={handleInputChange}
					/>
				</div>
				<div className='mb-3'>
					<input
						type='text'
						placeholder='Category'
						className='form-control'
						name='category'
						value={activity.category}
						onChange={handleInputChange}
					/>
				</div>
				<div className='mb-3'>
					<input
						type='date'
						placeholder='Date'
						className='form-control'
						value={activity.date}
						onChange={(e) => handleInput('date', e.target.value)}
					/>
				</div>
				<div className='mb-3'>
					<input
						type='text'
						placeholder='City'
						className='form-control'
						value={activity.city}
						onChange={(e) => handleInput('city', e.target.value)}
					/>
				</div>
				<div className='mb-3'>
					<input
						type='text'
						placeholder='Venue'
						className='form-control'
						value={activity.venue}
						onChange={(e) => handleInput('venue', e.target.value)}
					/>
				</div>
				<div className='d-flex justify-content-end'>
					<button type='submit' className='btn btn-primary me-2'>
						Submit
						{loading && (
							<span
								className='spinner-border spinner-border-sm ms-2'
								role='status'
								aria-hidden='true'
							></span>
						)}
					</button>
					<NavLink to='/activities'>
						<button type='button' className='btn btn-secondary'>
							Cancel
						</button>
					</NavLink>
				</div>
			</form>
		</div>
	);
}
export default observer(ActivityForm);
