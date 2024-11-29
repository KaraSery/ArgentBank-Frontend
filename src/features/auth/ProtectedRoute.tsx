import {useNavigate} from "react-router-dom";
import {ReactNode, useEffect} from "react";
import {useAppSelector} from "../../app/hooks";
import {selectUserProfile} from "./authSlice";
import {isAuthenticated} from "./utils";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const user = useAppSelector(selectUserProfile);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated(user)) {
            navigate('/login');
        }
    }, [user])

    return (
        <>
            {children}
        </>
    )
}

