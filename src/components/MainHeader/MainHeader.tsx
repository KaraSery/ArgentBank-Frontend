import UserNavBar from "../../features/auth/UserNavBar/UserNavBar";
import './MainHeader.scss'
export default function MainHeader() {
    return (
        <header className="main-header">
            <UserNavBar/>
        </header>
    )
}