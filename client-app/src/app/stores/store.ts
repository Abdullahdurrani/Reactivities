import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore
}

// contains multiple objects of stores
export const store: Store = {
    activityStore: new ActivityStore()
}

// createContext stores the "store" object
export const StoreContext = createContext(store);

// useContext allows the use of Context in child components
export function useStore() {
    return useContext(StoreContext);
}

