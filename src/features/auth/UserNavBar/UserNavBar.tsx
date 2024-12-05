import { useAppSelector } from "../../../app/hooks"
import {
  selectUserProfile,
  useGetUserProfileQuery,
  useLogoutMutation,
} from "../authSlice"
import { isAuthenticated } from "../utils"
import { Link } from "react-router-dom"
import "./UserNavBar.scss"

export default function UserNavBar() {
  const user = useAppSelector(selectUserProfile)
  const [logout] = useLogoutMutation()
  useGetUserProfileQuery()

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
      <div className={"main-nav-items-wrapper"}>
        {isAuthenticated(user) ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user.userName}
            </Link>
            <a
              className="main-nav-item"
              href="#"
              onClick={() => logout(undefined)}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </>
        ) : (
          <>
            <Link className="main-nav-item" to={`login`}>
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
