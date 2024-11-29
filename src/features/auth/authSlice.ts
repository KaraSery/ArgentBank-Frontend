import {createSelector, createSlice} from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice";
import {RootState} from "../../app/store";

export const apiSliceWithAuthentication = apiSlice.enhanceEndpoints({addTagTypes: ['Auth']})
    .injectEndpoints({
        endpoints: (builder) => ({
            login: builder.mutation<LoginResponse, LoginBody>({
                query: (body) => ({
                    url: 'login',
                    method: 'POST',
                    body
                }),
                async onQueryStarted(body, {dispatch, queryFulfilled}) {
                    try {
                        const {data} = await queryFulfilled
                        localStorage.setItem('token', data.body.token)
                        dispatch(apiSliceWithAuthentication.util.invalidateTags(['Auth']))
                    } catch (error) {
                    }
                }
            }),
            logout: builder.mutation({
                queryFn: async () => {
                    return {data: 'logout'}
                },
                async onQueryStarted(body, {dispatch, queryFulfilled}) {
                    try {
                        localStorage.removeItem('token')
                        await queryFulfilled
                        dispatch(apiSliceWithAuthentication.util.invalidateTags(['Auth']))
                    } catch (error) {
                    }
                }
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

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} = apiSliceWithAuthentication

const initialState: User = {
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    userName: null,
    createdAt: null,
    updatedAt: null,
    id: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: { payload: string }) => {
            state.token = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addMatcher(apiSliceWithAuthentication.endpoints.logout.matchFulfilled, () => initialState)
            .addMatcher(apiSliceWithAuthentication.endpoints.login.matchFulfilled, (state, action) => {
                state.token = action.payload.body.token
            })
            .addMatcher(apiSliceWithAuthentication.endpoints.getUserProfile.matchFulfilled, (state, action) => {
                return {...state, ...action.payload.body}
            })
    }
})
export const {setToken} = authSlice.actions
export const selectUserProfile = createSelector(
    (state: RootState) => state.auth,
    (res) => res
)