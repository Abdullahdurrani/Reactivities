import { useField } from 'formik';

interface Props {
	placeholder: string;
	name: string;
	rows: number;
	label?: string;
}

function MyTextArea(props: Props) {
	const [field, meta] = useField(props.name);
	return (
		<div>
			<label>{props.label}</label>
			<textarea {...field} {...props} className='form-control' />
			{/* if error show in label otherwise pass null */}
			{meta.touched && meta.error ? <label className='text-danger'>{meta.error}</label> : null}
		</div>
	);
}

export default MyTextArea;
