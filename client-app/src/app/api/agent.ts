import { history } from './../../index';
import { Activity } from './../models/Activity';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { store } from '../stores/store';

// this adds the specified delay to components
const sleep = (delay: number) => {
	// returns a Promise which on resolve runs setTimeout
	return new Promise((resolve) => {
		// resolve is to be executed after the delay expires.
		setTimeout(resolve, delay);
	});
};

// default url for every request
axios.defaults.baseURL = 'http://localhost:5000/api';

// intercepts the response before it is handled
axios.interceptors.response.use(
	async (response) => {
		await sleep(300);
		return response;
	},
	(error: AxiosError) => {
		const { data, status, config } = error.response!;
		console.log(error.response);

		switch (status) {
			case 400:
				// a simple 400 bad request error doesn't contain errors object so we just toast its data string
				if (typeof data === 'string') {
					toast.error(data);
				}
				// to handle notaguid, hasOwnProperty returns a boolean and errors contains id property so it returns true
				if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
					history.push('/not-found');
				}
				// if data contains errors like in validation multiple errors array, used in form post
				if (data.errors) {
					// array which contains every error array
					const errorsArray = [];
					// errors object contain key for every error e.g errors: title: ["title cannot be empty"] here title is key
					for (const key in data.errors) {
						if (data.errors[key]) {
							errorsArray.push(data.errors[key]);
						}
					}
					// flat returns array with all elements of subarray concatenated e.g [1,[3,4]] => [1,2,3,4]
					// because err is catch and displayed so we throw from here. e.g in TestError.tsx it is logged using axios.post().catch
					throw errorsArray.flat();
				}
				break;
			case 401:
				toast.error('unauthorized');
				break;
			case 404:
				// comes from index.tsx
				history.push('not-found');
				break;
			case 500:
				// data contains 3 properties statusCode,message,details same as error object in commonStore
				store.commonStore.setServerError(data);
				history.push('/server-error');
				break;
		}
		return Promise.reject(error);
	}
);

// the data from api is in response.data
// arrow function which takes response(of type AxiosResponse) as parameter and returns response.data
// T specifies the generic( works with different types)
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// object contains all the requests we make to axios
const requests = {
	// takes url as parameter and if promise is resolved(then is used) returns data
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	// post and put contain an object (newly created or edited) too in parameter
	post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

// object which stores the data from requests
const Activities = {
	// get method returns data in list, here / refers to baseUrl
	list: () => requests.get<Activity[]>('/activities'),
	details: (id: string) => requests.get<Activity>(`/activities/${id}`),
	create: (activity: Activity) => axios.post<void>(`/activities`, activity),
	// takes activity from client-app, and requests to api controller with id in route and activity in body of request
	update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
	delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

// because there can be different models than Activity so we store it in an object and export that object
const agent = {
	Activities,
	// eg here it can be Users
};

export default agent;
