import React, {useState} from "react";
import {useLoginMutation} from "../authSlice";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {useNavigate} from "react-router-dom";

type ErrorDataObject = {
    message: string;
    status: number;
}

function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

function isErrorDataObject(data: unknown): data is ErrorDataObject {
    return typeof data === 'object' && data != null && 'message' in data && 'status' in data
}

export default function LogInForm() {
    const [login, {data, error, isError, isSuccess}] = useLoginMutation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        if (form.checkValidity()) {
            login({
                email: email,
                password: password,
            })
        }
    }
    return (
        <form id='login-form' data-testid="sign-in-form" onSubmit={handleSubmit}>
            {
                isError && isFetchBaseQueryError(error) && isErrorDataObject(error.data) &&
                <div>
                    {error.data.message}
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