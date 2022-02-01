import React from "react";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activity: Activity;
}

export default function ActivityDetails({ activity }: Props) {
    return (
            <div className="card" style={{ width: "24rem" }} >
                <img className="card-img-top" src={require(`../../../assets/categoryImages/${activity.category}.jpg`)} alt="image" />
                <div className="card-body">
                    <h5 className="card-title">{activity.title} </h5>
                    <p className="card-text">{activity.description}</p>
                </div>
                <div className="card-body d-flex">
                    <a href="#" className="btn btn-outline-primary flex-fill">Edit</a>
                    <a href="#" className="btn btn-outline-secondary flex-fill">Cancel</a>
                </div>
            </div>
    )
}