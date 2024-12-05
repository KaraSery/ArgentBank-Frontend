import React from "react"
import { StrictMode } from 'react'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import LogIn from "./pages/LogIn/LogIn";
import User from "./pages/User/User";
import Home from "./pages/Home/Home";

import { store } from "./app/store"

import "./main.scss"

import ProtectedRoute from "./features/auth/ProtectedRoute";
import {apiSliceWithAuthentication, setToken} from "./features/auth/authSlice";

if ('token' in localStorage) {
    store.dispatch(setToken(localStorage.getItem("token")!));
    store.dispatch(apiSliceWithAuthentication.endpoints.getUserProfile.initiate())
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <LogIn/>
            },
            {
                path: '/user',
                element: (<ProtectedRoute>
                    <User/>
                </ProtectedRoute>)
            }
        ]
    },
]);
const container  = document.getElementById('root')
if (container) {
    createRoot(container).render(
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </StrictMode>,
    )
}