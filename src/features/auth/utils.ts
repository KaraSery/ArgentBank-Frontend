import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

type ErrorDataObject = {
    message: string;
    status: number;
}


export function isAuthenticated(user: User) {
    return !!user.token
}

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorDataObject(data: unknown): data is ErrorDataObject {
    return typeof data === 'object' && data != null && 'message' in data && 'status' in data
}