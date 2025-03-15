import React from "react";
import "./NavBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signOut } from "../store/counter/counterUser";

function NavBar() {
    const userInfo = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();

    return (
        <nav className="main-nav">
            <Link to="/home" className="main-nav-logo">
                <img className="main-nav-logo-image" src="/argentBankLogo.png" alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link className="main-nav-item" to="/sign-in">
                    <FontAwesomeIcon icon={faUserCircle} />
                    {userInfo.user.firstName === "" ? <div>Sign In</div> : <div>{userInfo.user.firstName}</div>}
                </Link>
                {userInfo.user.firstName !== "" && (
                    <div onClick={() => dispatch(signOut())} className="main-nav-item">
                        <FontAwesomeIcon icon={faSignOut} />
                        <div>Sign Out</div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
