import { useField } from 'formik';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

// partial makes every property in DatePicker optional
function MySelectInput(props: Partial<ReactDatePickerProps>) {
	const [field, meta, helpers] = useField(props.name!);
	return (
		<div>
			<DatePicker
				{...field}
				{...props}
				// if field contains value set Date value to that otherwise set it to null
				selected={(field.value && new Date(field.value)) || null}
				onChange={(value) => helpers.setValue(value)}
				className='form-control'
			/>

			{/* if error show in label otherwise pass null */}
			{meta.touched && meta.error ? <label className='text-danger'>{meta.error}</label> : null}
		</div>
	);
}

export default MySelectInput;
