import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAppSelector} from "../../app/hooks";
import {selectUserProfile} from "./authSlice";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = useAppSelector(selectUserProfile);
    const navigate = useNavigate();
    console.log(user)
    useEffect(() => {
        if (!user.token) {
            navigate('/login');
        }
    }, [user])

    return (
        <>
            {children}
        </>
    )
}

