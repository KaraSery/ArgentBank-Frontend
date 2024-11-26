import {describe, expect} from "vitest";
import {apiSliceWithAuthentication} from "./authSlice";
import {waitFor} from "@testing-library/react";
import {isFulfilled, isPending} from '@reduxjs/toolkit'
import {makeStore} from "../../app/store";
describe("authReducer", () => {
    it("should return token when performing authentication with right credentials", async () => {
        const store = makeStore()

        await store.dispatch(apiSliceWithAuthentication.endpoints.login.initiate({
            email: "tony@stark.com",
            password: "password123",
        })).unwrap()

        expect(store.getState().auth.token).toBeTruthy()
    })
})