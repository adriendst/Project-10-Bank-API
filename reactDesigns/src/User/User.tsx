import React, { useEffect, useState } from "react";
import "./User.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/counter/counterUser";
import Input from "../Input/Input";

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

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
    }, [user]);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value);
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value);

    const [isUserEditing, setIsUserEditing] = useState(false);

    const confirmChange = async () => {
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
            dispatch(setUser(data.body));
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw error;
        }
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                {!isUserEditing ? (
                    <>
                        <h1>
                            Welcome back
                            <br />
                            {firstName} {lastName}!
                        </h1>
                        <button className="edit-button" onClick={() => setIsUserEditing(true)}>
                            Edit Name
                        </button>
                    </>
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            confirmChange();
                        }}
                    >
                        <Input label="First Name" type="text" setValue={handleFirstNameChange} value={firstName} />
                        <Input label="Last Name" type="text" setValue={handleLastNameChange} value={lastName} />
                        <button className="edit-button" type="submit">
                            Confirm
                        </button>
                    </form>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    );
}

export default User;
