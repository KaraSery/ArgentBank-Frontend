import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function MainHeader() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
       !isAuthenticated && navigate("/")
    }, [isAuthenticated]);
    return (
        <header className="main-header">
            <nav className="main-nav">
                <Link className="main-nav-logo" to="">
                    <img
                        className="main-nav-logo-image"
                        src="/img/argentBankLogo.png"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                {isAuthenticated ?
                    (<div>
                        <Link className="main-nav-item" to="/user">
                            <i className="fa fa-user-circle"></i>
                            Tony
                        </Link>
                        <a className="main-nav-item" href="#" onClick={()=> setIsAuthenticated(false)}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </a>
                    </div>) :
                    (<div>
                        <Link className="main-nav-item" to={`sign-in`}>
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    </div>)
                }
            </nav>
        </header>
    )
}