import {findByTestId, fireEvent, screen, waitFor} from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils";
import {describe} from "vitest";
import {AppStore} from "../../app/store";
import LogIn from "./LogIn";

interface LocalTestContext {
    store: AppStore
}
describe<LocalTestContext>("When Sign In form is created", ()=> {
    it("should render the form", async () => {
        renderWithProviders(<LogIn />)
        await screen.findByTestId('sign-in-form')
    })
    describe("When form is filled with right credential and submitted", () => {
        it('should Log In user', async () => {
            renderWithProviders(<LogIn />)
            const username = await screen.findByTestId('username-input')
            const password = await screen.findByTestId('password-input')
            fireEvent.change(username, {target: {value: 'tony@stark.com'}})
            fireEvent.change(password, {target: {value: 'password123'}})
            fireEvent(
                await screen.findByTestId('submit-button'),
                new MouseEvent('click', {
                    cancelable: true,
                    bubbles: true,
                })
            )
        });
    })
})