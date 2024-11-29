import {selectUserProfile, useUpdateUserProfileMutation} from "../authSlice";
import React, {useCallback, useState} from "react";
import {isErrorDataObject, isFetchBaseQueryError} from "../utils";
import {useAppSelector} from "../../../app/hooks";

export default function EditUserForm({handleCancel}: {handleCancel: () => void}) {
    const [updateUserProfile, {status, data, error, isError, isSuccess}] = useUpdateUserProfileMutation();
    const [userName, setUserName] = useState<string>('');
    const user = useAppSelector(selectUserProfile)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        if (form.checkValidity()) {
            await updateUserProfile({
                userName: userName,
            });
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {
                isError && isFetchBaseQueryError(error) && isErrorDataObject(error.data) &&
                <div>
                    {error.data.message}
                </div>
            }
            <div className="input-wrapper">
                <label htmlFor="username">Username</label
                ><input onInput={(e) => {
                setUserName(e.currentTarget.value)
            }} placeholder={user.userName!} required data-testid="username-input" type="text" id="username" name="username"/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="firstname">First name</label
                ><input value={user.firstName!} disabled type="text" id="firstname" name="firstname"/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="lastname">Last name</label
                ><input value={user.lastName!} disabled type="text" id="lastname" name="lastname"/>
            </div>
            <button type='submit' data-testid="save-button" className="sign-in-button">Save</button>
            <button type='button' onClick={handleCancel} data-testid="cancel-button" className="sign-in-button">Cancel</button>
        </form>
    )
}