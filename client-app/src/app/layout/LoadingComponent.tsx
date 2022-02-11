import React from 'react';

interface Props {
	content?: string;
}
export default function LoadingComponent({ content = 'Loading...' }: Props) {
	return (
		<div className='d-flex flex-column min-vh-100 justify-content-center align-items-center'>
			<div className='spinner-border' role='status'>
				<span className='sr-only'></span>
			</div>
			<p>{content}.</p>
		</div>
	);
}
