import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice";
import {RootState} from "../../app/store";


export const apiSliceWithAuthentication = apiSlice.injectEndpoints({
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
                    dispatch(apiSliceWithAuthentication.endpoints.getUserProfile.initiate())
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

export const logout = createAsyncThunk('auth/logout', async (_unused, { dispatch }) => {
    localStorage.removeItem('token')
    dispatch(
        apiSliceWithAuthentication.endpoints.getUserProfile.initiate()
    )
})

export const {
    useLoginMutation,
    useSignupQuery,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} = apiSliceWithAuthentication

const initialState: User = {
    token: localStorage.getItem('token'),
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
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(logout.fulfilled, () => initialState)
            .addMatcher(apiSliceWithAuthentication.endpoints.login.matchFulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.body.token)
                state.token = action.payload.body.token
            })
            .addMatcher(apiSliceWithAuthentication.endpoints.getUserProfile.matchFulfilled, (state, action) => {
                const user = action.payload.body
                console.log(state, user)
                return {...state, ...user}
            })
    }
})

export const selectUserProfile = createSelector(
    (state: RootState) => state.auth,
    (res) => res
)