import { Activity } from './../models/Activity';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { format } from 'date-fns';

export default class ActivityStore {
	activityRegistry = new Map<string, Activity>();
	selectedActivity: Activity | undefined = undefined;
	editMode = false;
	loading = false;
	// removes flickering on page load so initially set to true
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	get activitiesArray() {
		// sorted array
		return Array.from(this.activityRegistry.values()).sort(
			(a, b) => a.date!.getTime() - b.date!.getTime()
		);
	}

	get groupedActivities() {
		// returns array of key value pairs
		// obj = { "2021-10": [activity], "2021-11": [activity, activity2], "2021-12": [activity] };
		// Object.entries(obj); => [ [ "2021-10", [activity] ], [ "2021-11", [activity, activity2] ], [ "2021-12", [activity] ] ]
		return Object.entries(
			// reduce returns single value (in this case an object(activities) initialized with {})
			this.activitiesArray.reduce((activities, activity) => {
				const date = format(activity.date!, 'dd MMM yyyy');
				// if e.g {"2021-10": null} create new array => {"2021-10": []}
				if (activities[date] == null) activities[date] = [];
				// push to that array {"2021-10": [activity]} if date contains non empty array new object is passed to that array => {"2021-10": [activity1, activity2]}
				activities[date].push(activity);
				return activities;
			}, {} as { [key: string]: Activity[] })
		);
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
		activity.date = new Date(activity.date!);
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
