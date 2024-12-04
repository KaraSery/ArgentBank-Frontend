import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export type ErrorDataObject = {
    message: string;
    status: number;
}

export function isAuthenticated(user: User) {
    return user.token !== null;
}

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorDataObject(data: unknown): data is ErrorDataObject {
    return typeof data === 'object' && data != null && 'message' in data && 'status' in data
}

export function getErrorMessage(error: FetchBaseQueryError | SerializedError): string {
    if(isFetchBaseQueryError(error)){
        if('error' in error) {
            return error.error
        } else if(isErrorDataObject(error.data)) {
            return error.data.message
        }
    }else if('message' in error) {
        return error.message!
    }
    return 'Unknown error'
}