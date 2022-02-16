import React from 'react';

interface Props {
	errors: string[] | null;
}

function ValidationErrors({ errors }: Props) {
	return (
		<div className='alert alert-warning mt-4' role='alert'>
			{errors && (
				<ul>
					{errors.map((err: any, i) => (
						<li key={i}>{err}</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ValidationErrors;
