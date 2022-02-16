import { createContext, useContext } from 'react';
import ActivityStore from './activityStore';
import CommonStore from './commonStore';

interface Store {
	activityStore: ActivityStore;
	commonStore: CommonStore;
}

// contains multiple objects of stores
export const store: Store = {
	activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
};

// createContext stores the "store" object
export const StoreContext = createContext(store);

// useContext allows the use of Context in child components
export function useStore() {
	return useContext(StoreContext);
}
