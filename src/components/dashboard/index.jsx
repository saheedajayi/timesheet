import { useState, useEffect } from 'react';
import styles from '../dashboard/styles/Dashboard.module.css';
import NonAdmin from "./NonAdmin.jsx"
import Admin from "./Admin.jsx";
import Nav from "./Nav.jsx";
import {useSelector} from "react-redux";

const Dashboard = () => {
    const { currentUser } = useSelector(state => state.users);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.dashboard}>
            <Nav/>
            <div className={styles.content}>
                <h1>Welcome, {currentUser.fullname}!</h1>
            </div>
            <div className={styles.dateTime}>
                <div className={styles.time}>
                    <span>{currentTime.getHours().toString().padStart(2, '0')} </span>:
                    <span> {currentTime.getMinutes().toString().padStart(2, '0')} </span>:
                    <span> {currentTime.getSeconds().toString().padStart(2, '0')} </span>
                    <span> {currentTime.getHours() >= 12 ? ' PM' : ' AM'}</span>
                </div>
                <div className={styles.date}>
                    <span>{currentTime.toLocaleString('en-NG', { weekday: 'long' })}</span>,
                    <span> {currentTime.toLocaleString('en-NG', { month: 'long' })}</span>
                    <span> {currentTime.getDate()}</span>,
                    <span> {currentTime.getFullYear()}</span>
                </div>
            </div>

            <hr/>
            {currentUser.role === 'admin' ? <Admin /> : <NonAdmin />}
            <hr/>
        </div>
    );
};

export default Dashboard;
