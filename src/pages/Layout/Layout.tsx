import {Outlet} from "react-router-dom"
import MainHeader from "../../components/MainHeader/MainHeader";
import MainFooter from "../../components/MainFooter/MainFooter";

export default function Layout() {
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