import {Link, Outlet} from "react-router-dom"
import MainHeader from "../../components/MainHeader/MainHeader";
import MainFooter from "../../components/MainFooter/MainFooter";
import {useDispatch} from "react-redux";
import {apiSliceWithAuthentication, useGetUserProfileQuery} from "../../features/auth/authSlice";

export default function Layout() {
    // Since we are automatically set Authorization header in apiSlice
    // if token is present in localstorage
    // We can safely call useGetUserProfileQuery and therefore
    // authSlice would update with user profile information
    useGetUserProfileQuery()
    return (
        <>
            <MainHeader />
            <main>
                <Outlet/>
            </main>
            <MainFooter />
        </>
    )
}