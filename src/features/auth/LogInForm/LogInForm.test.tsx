import {findByText, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {renderWithProviders} from "../../../utils/test-utils";
import LogInForm from "./LogInForm";
import {expect, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

describe("When form is created", () => {
    it('it should redirect when submitted with right credentials', async () => {
        const {store} = renderWithProviders(<LogInForm/>)
        const state = store.getState();
        const username: HTMLInputElement = await screen.findByTestId('username-input')
        const password: HTMLInputElement = await screen.findByTestId('password-input')
        await userEvent.type(username, 'tony@stark.com')
        await userEvent.type(password, 'password123')

        expect(username.value).toEqual('tony@stark.com')
        fireEvent(
            await screen.findByTestId('submit-button'),
            new MouseEvent('click', {
                cancelable: true,
                bubbles: true,
            })
        )
    });
    it('it should show error message when submitted with wrong credentials', async () => {
        const {store} = renderWithProviders(<LogInForm/>)
        const state = store.getState();
        const username: HTMLInputElement = await screen.findByTestId('username-input')
        const password: HTMLInputElement = await screen.findByTestId('password-input')
        await userEvent.type(username, 'tony@sta.com')
        await userEvent.type(password, 'passd123')

        fireEvent(
            await screen.findByTestId('submit-button'),
            new MouseEvent('click', {
                cancelable: true,
                bubbles: true,
            })
        )
        await screen.findByText('Error: User not found!')
    });
})