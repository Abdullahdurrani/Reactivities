import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';

function ActivityForm() {
	const history = useHistory();
	const { activityStore } = useStore();
	const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;

	const { id } = useParams<{ id: string }>();

	const [activity, setActivity] = useState<Activity>({
		id: '',
		title: '',
		category: '',
		description: '',
		date: null,
		city: '',
		venue: '',
	});

	// for validation, passed to formik validationSchema property
	const validationSchema = Yup.object({
		title: Yup.string().required('Title is required'),
		category: Yup.string().required('Category is required'),
		description: Yup.string().required(),
	});

	// to check if there is an id passed in param
	// if there is loadActivity(from memory or api) setActivity then
	// if id is null activity is already populated in useState with initial MyTextInputs
	useEffect(() => {
		if (id) loadActivity(id).then((activity) => setActivity(activity!));
	}, [id, loadActivity]);

	function handleFormSubmit(activity: Activity) {
		// disables auto re renders
		// e.preventDefault();
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

	if (loadingInitial) return <LoadingComponent content='Loading activity' />;

	return (
		<div className='p-3 border mt-2' style={{ width: '24rem' }}>
			{/* if activity is reinitialized on useEffect on edit. It populates the MyTextInputs with object values */}
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={activity}
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit} autoComplete='off' className='me-4 mt-2'>
						<div className='mb-3'>
							<MyTextInput name='title' placeholder='Title' />
						</div>
						<div className='mb-3'>
							<MyTextArea rows={3} placeholder='Description' name='description' />
						</div>
						<div className='mb-3'>
							<MySelectInput options={categoryOptions} name='category' />
						</div>
						<div className='mb-3'>
							<MyDateInput
								placeholderText='Date'
								name='date'
								showTimeSelect
								timeCaption='time'
								dateFormat='MMMM d, yyyy h:mm aa'
							/>
						</div>
						<div className='mb-3'>
							<MyTextInput placeholder='City' name='city' />
						</div>
						<div className='mb-3'>
							<MyTextInput placeholder='Venue' name='venue' />
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
					</Form>
				)}
			</Formik>
		</div>
	);
}
export default observer(ActivityForm);
