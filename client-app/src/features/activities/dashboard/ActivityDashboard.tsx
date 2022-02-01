import React from "react";
import { Activity } from "../../../app/models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
    return (
            <div className="row">
                <div className="col-8">
                    <ActivityList activities={activities} />
                </div>
                <div className="col-4">
                    {activities[0] &&
                        <ActivityDetails activity={activities[0]} />}
                </div>
            </div>
    )
}
