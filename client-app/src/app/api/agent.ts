import { Activity } from './../models/Activity';
import axios, { AxiosResponse } from "axios";

// this adds the sepecified delay to components
const sleep = (delay: number ) => {
    // returns a Promise which on resolve runs setTimeout
    return new Promise((resolve) => {
        // resolve is to be executed after the delay expires.
        setTimeout(resolve, delay);
    })
}

// default url for every request 
axios.defaults.baseURL = 'http://localhost:5000/api';

// intercepts the response before it is handled
axios.interceptors.response.use(async response => {
    try {
        await sleep(300);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

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
}

// object which stores the data from requests
const Activities = {
    // get method returns data in list, here / refers to baseUrl
    list: () => requests.get<Activity[]>('/activities')
}

// because there can be different models than Activity so we store it in an object and export that object
const agent = {
    Activities
    // eg here it can be Users 
}

export default agent;