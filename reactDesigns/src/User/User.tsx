import React, { useEffect, useState } from "react";
import "./User.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/counter/counterUser";
import Input from "../Input/Input";
import Account from "../Account/Account";

export type User = {
    createdAt: string;
    updatedAt: string;
    email: string;
    firstName: string;
    lastName: string;
    id: string;
};

function User() {
    const user = useAppSelector((state) => state.user.user);
    const token = useAppSelector((state) => state.user.token);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/home");
            return;
        }

        if (user.firstName !== "") return;

        const fetchUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                dispatch(setUser(data.body));
                console.log(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                navigate("/home");
            }
        };

        fetchUserProfile();
    }, [token]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
    }, [user]);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value);
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value);

    const [isUserEditing, setIsUserEditing] = useState(false);

    const cancelChange = () => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setIsUserEditing(false);
    };

    const confirmChange = async () => {
        if (firstName === "" || lastName === "") {
            setShowError(true);
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ firstName, lastName }),
            });

            if (!response.ok) {
                throw new Error("Failed to update user profile");
            }

            const data = await response.json();
            setIsUserEditing(false);
            setShowError(false);
            dispatch(setUser(data.body));
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw error;
        }
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back</h1>
                {!isUserEditing ? (
                    <>
                        <h1>
                            {firstName} {lastName}!
                        </h1>
                        <button className="edit-button" onClick={() => setIsUserEditing(true)}>
                            Edit Name
                        </button>
                    </>
                ) : (
                    <>
                        <div className="headerChange">
                            <Input type="text" setValue={handleFirstNameChange} value={firstName} />
                            <Input type="text" setValue={handleLastNameChange} value={lastName} />
                        </div>
                        {showError && <p className="errorMessage">Both fields must be filled</p>}
                        <div className="headerChange">
                            <button className="edit-button" onClick={confirmChange}>
                                Save
                            </button>
                            <button className="edit-button" onClick={cancelChange}>
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account amount="2,082.79" description="Available Balance" title="Argent Bank Checking (x8349)" />
            <Account amount="10,928.42" description="Available Balance" title="Argent Bank Savings (x6712)" />
            <Account amount="184.30" description="Current Balance" title="Argent Bank Checking (x8349)" />
        </main>
    );
}

export default User;
