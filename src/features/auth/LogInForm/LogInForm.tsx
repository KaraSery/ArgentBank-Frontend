import React, {useEffect, useState} from "react";
import {selectUserProfile, useLoginMutation} from "../authSlice";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks";
import {
    getErrorMessage, isAuthenticated
} from "../utils";

import './LoginForm.scss'

export default function LogInForm({redirect}: {redirect: string}) {
    const [login, {data, error, isError, isSuccess}] = useLoginMutation();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const user = useAppSelector(selectUserProfile)
    useEffect(() => {
        if(isAuthenticated(user) || isSuccess) navigate(redirect);
        if(isError) setErrorMessage(getErrorMessage(error))
    }, [user, isError, isSuccess])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        if (form.checkValidity()) {
            try {
                await login({
                    email: email,
                    password: password,
                }).unwrap()
            } catch (error) {
                console.error(error)
            }
        }
    }
    return (
        <form id='login-form' data-testid="sign-in-form" onSubmit={handleSubmit}>
            { isError &&
                <div className={'error'}>
                    {errorMessage}
                </div>
            }
            <div className="input-wrapper">
                <label htmlFor="username">Username</label
                ><input onInput={(e)=> {setEmail(e.currentTarget.value)}} required data-testid="username-input" type="email" id="email" name="email"/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label
                ><input onInput={(e)=> {setPassword(e.currentTarget.value)}} required data-testid="password-input" type="password" id="password" name="password"/>
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me"/><label htmlFor="remember-me"
            >Remember me</label
            >
            </div>
            <button data-testid="submit-button" className="sign-in-button">Sign In</button>
        </form>

    )
}