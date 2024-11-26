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

import "/public/css/main.css"

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
                path: '/sign-in',
                element: <LogIn/>
            },
            {
                path: '/user',
                element: <User/>
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
