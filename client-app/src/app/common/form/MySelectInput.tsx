import { Field, useField } from 'formik';

interface Props {
	name: string;
	options: any;
	label?: string;
}

function MySelectInput(props: Props) {
	const [field, meta] = useField(props.name);
	return (
		<div>
			<label>{props.label}</label>
			<Field as='select' id={props.name} name={props.name} className='form-control'>
				{props.options.map((option: any) => {
					return (
						<option key={option.value} value={option.value}>
							{option.text}
						</option>
					);
				})}
			</Field>
			{/* if error show in label otherwise pass null */}
			{meta.touched && meta.error ? <label className='text-danger'>{meta.error}</label> : null}
		</div>
	);
}

export default MySelectInput;
