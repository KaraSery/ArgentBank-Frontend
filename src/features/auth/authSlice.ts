import {createSlice} from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice";



export const apiSliceWithAuthentication = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginBody>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body
            })
        }),
        signup: builder.query<UserProfileResponse, SignupBody>({
            query: (body) => ({
                url: 'signup',
                method: 'POST',
                body
            })
        }),
        getUserProfile: builder.query<UserProfileResponse, void>({
            query: () => ({
                url: 'profile',
                method: 'GET',
            }),
            providesTags: ['Auth']
        }),
        updateUserProfile: builder.mutation<UserProfileResponse, UpdateProfileBody>({
            query: (body) => ({
                url: 'profile',
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Auth']
        })
    })
})
export const { useLoginMutation, useSignupQuery, useGetUserProfileQuery, useUpdateUserProfileMutation } = apiSliceWithAuthentication

const initialState: Token = {
    token: localStorage.getItem('token'),
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null
        }
    },
    extraReducers(builder) {
        builder
            .addMatcher(apiSliceWithAuthentication.endpoints.login.matchFulfilled, (state, action) => {
                return action.payload.body
            })
    }
})
