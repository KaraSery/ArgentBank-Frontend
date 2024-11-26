import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from "../../app/store";
import {authSlice} from "../auth/authSlice";





const BASE_URL = 'http://localhost:3001/api/v1/user/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            const authState: Token = (getState() as RootState).auth;
            if (authState.token) {
                headers.set('Authorization', `Bearer ${authState.token}`);
                return headers;
            }
        },
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({

    })
})


