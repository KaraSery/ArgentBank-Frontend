import {describe, expect} from "vitest";
import {apiSliceWithAuthentication} from "./authSlice";
import {waitFor} from "@testing-library/react";
import {isFulfilled, isPending} from '@reduxjs/toolkit'
import {makeStore} from "../../app/store";
describe("authReducer", () => {
    it("should return token when dispatching authentication with right credentials", async () => {
        const store = makeStore()

        await store.dispatch(apiSliceWithAuthentication.endpoints.login.initiate({
            email: "tony@stark.com",
            password: "password123",
        })).unwrap()
        expect(store.getState().auth.token).toBeTruthy() 
    })
    it("should return user when dispatching getUserProfile while authenticated", async () => {
        const store = makeStore()

        await store.dispatch(apiSliceWithAuthentication.endpoints.login.initiate({
            email: "tony@stark.com",
            password: "password123",
        })).unwrap()
        expect(store.getState().auth.token).toBeTruthy()
    })
})