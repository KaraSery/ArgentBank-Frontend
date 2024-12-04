import React from "react";
import LogInForm from "../../features/auth/LogInForm/LogInForm";

export default function LogIn() {

    return (
        <main className={'main'}>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <LogInForm redirect={'/user'}/>
            </section>
        </main>
    )
}