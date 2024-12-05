import {selectUserProfile, useUpdateUserProfileMutation} from "../authSlice";
import React, {useEffect, useState} from "react";
import {getErrorMessage, isAuthenticated} from "../utils";
import {useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import './EditForm.scss'
export default function EditUserForm({handleCancel}: { handleCancel: () => void }) {
    const [updateUserProfile, {error, data, isError, isSuccess}] = useUpdateUserProfileMutation();
    const user = useAppSelector(selectUserProfile)
    const [userName, setUserName] = useState<string>(user.userName!);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        if(isError) setErrorMessage(getErrorMessage(error))
    }, [isError])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        if (!isAuthenticated(user)) {
            navigate("/login");
        }
        if (form.checkValidity()) {
            try {
                await updateUserProfile({
                    userName: userName,
                }).unwrap();
            }catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <form className={'edit-user-form'} onSubmit={handleSubmit}>
            <h1>Edit user info</h1>
            {isError &&
                <div className={'error'}>
                    {errorMessage}
                </div>
            }
            {isSuccess &&
                <div className={'success'}>
                    {data.message}
                </div>
            }

            <div className="input-wrapper">
                <label htmlFor="username">User name</label
                ><input onInput={(e) => {
                setUserName(e.currentTarget.value)
            }} value={userName} required data-testid="username-input" type="text" id="username"
                        name="username"/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="firstname">First name</label
                ><input value={user.firstName!} disabled type="text" id="firstname" name="firstname"/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="lastname">Last name</label
                ><input value={user.lastName!} disabled type="text" id="lastname" name="lastname"/>
            </div>
            <div className={'submit-cancel'}>
                <button type='submit' data-testid="save-button" className="button">Save</button>
                <button type='button' onClick={handleCancel} data-testid="cancel-button"
                        className="button">Cancel
                </button>
            </div>
        </form>
    )
}