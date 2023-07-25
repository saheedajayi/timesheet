import styles from "./styles/Nav.module.css";
import profilePicture from "../../assets/passport-1.jpg";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Nav() {
    const { currentUser } = useSelector(state => state.users);
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/');
    };
    return (
        <div className={styles.navbar}>
            <div className={styles.userInfo}>
                <img
                    className={styles.profilePicture}
                    src={currentUser.image}
                    // src={profilePicture}
                    alt="User Profile"
                />
                <span className={styles.userName}>{currentUser.fullname}</span>
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Nav;