import React from "react";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activity: Activity;
    handleCancelSelectedActivity: () => void;
    handleFormOpen: (id: string) => void;
}

export default function ActivityDetails({ activity, handleCancelSelectedActivity, handleFormOpen }: Props) {
    return (
            <div className="card" style={{ width: "24rem" }} >
                <img className="card-img-top" src={require(`../../../assets/categoryImages/${activity.category}.jpg`)} alt="image" />
                <div className="card-body">
                    <h5 className="card-title">{activity.title} </h5>
                    <p className="card-text">{activity.description}</p>
                </div>
                <div className="card-body d-flex">
                    <a href="#" onClick={() => handleFormOpen(activity.id)} className="btn btn-outline-primary flex-fill">Edit</a>
                    {/* because we dont use parameters it will wait for click event */}
                    <a href="#" onClick={handleCancelSelectedActivity} className="btn btn-outline-secondary flex-fill">Cancel</a>
                </div>
            </div>
    )
}