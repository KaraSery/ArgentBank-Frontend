import React from "react";

export default function LogIn() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form id='login-form' data-testid="sign-in-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label
                        ><input required data-testid="username-input" type="email" id="email" name="email"/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label
                        ><input required data-testid="password-input" type="password" id="password" name="password"/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me"/><label htmlFor="remember-me"
                    >Remember me</label
                    >
                    </div>
                    <button data-testid="submit-button" className="sign-in-button">Sign In</button>
                </form>
            </section>
        </>
    )
}