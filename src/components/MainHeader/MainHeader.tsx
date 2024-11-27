import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import UserNavBar from "../../features/auth/UserNavBar/UserNavBar";

export default function MainHeader() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
       !isAuthenticated && navigate("/")
    }, [isAuthenticated]);
    return (
        <header className="main-header">
            <UserNavBar/>
        </header>
    )
}