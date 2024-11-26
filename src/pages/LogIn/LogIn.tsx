import React from "react";
import LogInForm from "../../features/auth/LogInForm/LogInForm";

export default function LogIn() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <LogInForm/>
            </section>
        </>
    )
}