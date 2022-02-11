import { Activity } from './../models/Activity';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';


export default class ActivityStore {
	activityRegistry = new Map<string, Activity>();
	selectedActivity: Activity | undefined = undefined;
	editMode = false;
	loading = false;
	// removes flickering on page load so initially set to true
	loadingInitial = true;

	constructor() {
		makeAutoObservable(this);
	}

	get activitiesArray() {
		return Array.from(this.activityRegistry.values());
	}

	// gets data from api and stores them activities array
	loadActivities = async () => {
		this.loadingInitial = true;
		try {
			const activities = await agent.Activities.list();
			activities.forEach((activity) => {
				this.setActivity(activity);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	loadActivity = async (id: string) => {
		let activity = this.getActivity(id);
		if (activity) {
			this.selectedActivity = activity;
			// it is used in form to populate fields so return that activity
			return activity;
		} else {
			this.loadingInitial = true;
			try {
				// in case users refreshes on details page activity is get from api
				activity = await agent.Activities.details(id);
				this.setActivity(activity);
				runInAction(() => {
					this.selectedActivity = activity;
				});
				this.setLoadingInitial(false);
				return activity;
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	};

	private setActivity = (activity: Activity) => {
		activity.date = activity.date.split('T')[0];
		// 	Sets the value for a key in a Map for new entry
		this.activityRegistry.set(activity.id, activity);
	};

	// check if activity is in memory
	private getActivity = (id: string) => {
		return this.activityRegistry.get(id);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	createActivity = async (activity: Activity) => {
		this.loading = true;
		try {
			await agent.Activities.create(activity);
			// any state which is changed after await must be in runInAction
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity);
				this.selectedActivity = activity;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateActivity = async (activity: Activity) => {
		this.loading = true;
		try {
			await agent.Activities.update(activity);
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity);
				this.selectedActivity = activity;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	deleteActivity = async (id: string) => {
		this.loading = true;
		try {
			await agent.Activities.delete(id);
			runInAction(() => {
				this.activityRegistry.delete(id);
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};
}
