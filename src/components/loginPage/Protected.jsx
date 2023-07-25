import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Protected() {
    const navigate = useNavigate()
    const {isAuthenticated} = useSelector(state => state.users)
    if (!isAuthenticated) {
        navigate("/")
        return;
    }
    return (
        <Outlet/>
    );
}

export default Protected;