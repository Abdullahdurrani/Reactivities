import { useField } from 'formik';

interface Props {
	placeholder: string;
	name: string;
	label?: string;
}

function MyTextInput(props: Props) {
	const [field, meta] = useField(props.name);
	return (
		<div>
			<label>{props.label}</label>
			{/* fields contain onChange etc, ...field spreads those attributes */}
			<input {...field} {...props} className='form-control' />
			{/* if error show in label otherwise pass null */}
			{meta.touched && meta.error ? <label className='text-danger'>{meta.error}</label> : null}
		</div>
	);
}

export default MyTextInput;
