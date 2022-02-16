import React, { useState } from 'react';
import axios from 'axios';
import ValidationErrors from './ValidationErrors';

export default function TestErrors() {
	const baseUrl = 'http://localhost:5000/api/';
	// stores errors array thrown from agent.ts
	const [errors, setErrors] = useState(null);

	function handleNotFound() {
		axios.get(baseUrl + 'buggy/not-found').catch((err) => console.log(err.response));
	}

	function handleBadRequest() {
		axios.get(baseUrl + 'buggy/bad-request').catch((err) => console.log(err.response));
	}

	function handleServerError() {
		axios.get(baseUrl + 'buggy/server-error').catch((err) => console.log(err.response));
	}

	function handleUnauthorized() {
		axios.get(baseUrl + 'buggy/unauthorized').catch((err) => console.log(err.response));
	}

	function handleBadGuid() {
		axios.get(baseUrl + 'activities/notaguid').catch((err) => console.log(err.response));
	}

	function handleValidationError() {
		axios.post(baseUrl + 'activities', {}).catch((err) => setErrors(err));
	}

	return (
		<>
			<h3>Test Error Component</h3>
			<div>
				<div className='btn-group' role='group' aria-label='Basic example'>
					<button onClick={handleNotFound} type='button' className='btn btn-primary'>
						Not Found
					</button>
					<button onClick={handleBadRequest} type='button' className='btn btn-primary'>
						Bad Request
					</button>
					<button onClick={handleValidationError} type='button' className='btn btn-primary'>
						Validation Error
					</button>
					<button onClick={handleServerError} type='button' className='btn btn-primary'>
						Server Error
					</button>
					<button onClick={handleUnauthorized} type='button' className='btn btn-primary'>
						Unauthorized
					</button>
					<button onClick={handleBadGuid} type='button' className='btn btn-primary'>
						Bad Guid
					</button>
				</div>
				{errors && <ValidationErrors errors={errors} />}
			</div>
		</>
	);
}
