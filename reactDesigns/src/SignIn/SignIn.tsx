import React, { useState } from "react";
import "./SignIn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setToken } from "../store/counter/counterUser";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => setRememberMe(event.target.checked);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const checkUser = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Erreur HTTP : ${response.status}`);
            }

            if (data.status === 200) {
                dispatch(setToken(data.body.token));
                navigate("/user");
            }
        } catch (error) {
            setError(error.message.split(":")[1]);
            console.error("Erreur lors de la connexion :", error.message);
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} />
                <h1>Sign In</h1>
                <div>
                    <Input type="text" label="Username" setValue={handleUsernameChange} value={username} />
                    <Input type="password" label="Password" setValue={handlePasswordChange} value={password} />
                    <Input type="checkbox" label="Remember me" setValue={handleRememberMeChange} value={rememberMe} />
                    {error && <p className="errorMessage">{error}</p>}
                    <button className="sign-in-button" onClick={checkUser}>
                        Sign In
                    </button>
                </div>
            </section>
        </main>
    );
}

export default SignIn;
