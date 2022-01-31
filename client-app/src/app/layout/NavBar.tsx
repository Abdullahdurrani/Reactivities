import React from "react";
import Logo from '../../assets/logo.png'

export default function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info ">
                <div className="container">
                    <ul className="nav ">
                        <li className="nav-item ms-3">
                            <img src={Logo} width={40} alt="logo" />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white navbar-brand" href="#Reactivities">Reactivities</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#Activities">Activities</a>
                        </li>
                        <li className="nav-item ms-3">
                            <button type="button" className="btn btn-secondary">Create Activity</button>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>

    );
}