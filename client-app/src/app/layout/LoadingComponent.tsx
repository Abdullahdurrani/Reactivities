import React from "react";

export default function LoadingComponent() {
    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>     
            </div>
            <p>Loading...</p>
        </div>
    )
}