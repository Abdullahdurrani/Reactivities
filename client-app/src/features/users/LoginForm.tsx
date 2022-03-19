import { Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';

export default function LoginForm() {
	return (
		<Formik initialValues={{ email: '', password: '' }} onSubmit={(values) => console.log(values)}>
			{({ handleSubmit }) => (
				<Form className='form' onSubmit={handleSubmit} autoComplete='off'>
					<MyTextInput name='email' placeholder='Email' />
					<MyTextInput name='password' placeholder='Password' type='password' />
					<button className='btn btn-primary' type='submit'>
						Login
					</button>
				</Form>
			)}
		</Formik>
	);
}
