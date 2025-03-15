import React, { useState } from "react";
import "./SignIn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
/*     const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => setRememberMe(event.target.value);
 */


    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} />
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label>Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label>Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label>Remember me</label>
                    </div>
                    {/*             <!-- PLACEHOLDER DUE TO STATIC SITE -->
                     */}{" "}
                    <a href="./user.html" className="sign-in-button">
                        Sign In
                    </a>
                    {/*   <!-- SHOULD BE THE BUTTON BELOW -->
            <!-- <button class="sign-in-button">Sign In</button> -->
            <!--  --> */}
                </form>
            </section>
        </main>
    );
}

export default SignIn;
