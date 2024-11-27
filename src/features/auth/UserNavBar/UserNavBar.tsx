import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {apiSliceWithAuthentication, logout, selectUserProfile, useGetUserProfileQuery} from "../authSlice";
import {isAuthenticated} from "../utils";
import {Link} from "react-router-dom";

export default function UserNavBar() {
    const user = useAppSelector(selectUserProfile)
    const dispatch = useAppDispatch()
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="">
                <img
                    className="main-nav-logo-image"
                    src="/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {isAuthenticated(user) ?
                (
                    <div>
                        <Link className="main-nav-item" to="/user">
                            <i className="fa fa-user-circle"></i>
                            {user.firstName}
                        </Link>
                        <a className="main-nav-item" href="#" onClick={() => dispatch(logout())}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </a>
                    </div>
                ) :
                (
                    <div>
                        <Link className="main-nav-item" to={`login`}>
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    </div>
                )
            }
        </nav>
    );
}