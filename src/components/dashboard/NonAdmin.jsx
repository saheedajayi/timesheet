import { useState, useEffect } from 'react';
import styles from './styles/NonAdmin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clockActions } from "../../store/clockSlice.js";

function NonAdmin() {
    const dispatch = useDispatch();
    const { clocks } = useSelector(state => state.clocks);

    const [clockIn, setClockIn] = useState(null);
    const [clockOut, setClockOut] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    // Function to handle clock-in
    const handleClockIn = () => {
        setClockIn(new Date());
        dispatch(clockActions.clockIn());
    };

    // Function to handle clock-out
    const handleClockOut = () => {
        setClockOut(new Date());
        setButtonDisabled(true);
        dispatch(clockActions.clockOut());
    };

    // Function to reset the clock state
    const resetClock = () => {
        setClockIn(null);
        setClockOut(null);
        setButtonDisabled(false);
    };

    // Check if the current time is beyond 8 AM and reset clock state if needed
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const nextDay8AM = new Date(now);
            nextDay8AM.setDate(nextDay8AM.getDate() + 1);
            nextDay8AM.setHours(8, 0, 0, 0);

            if (now >= nextDay8AM) {
                resetClock();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.clockContainer}>
            {clockIn && (
                <div className={styles.clockInAndOut}>
                    {clockOut ? (
                        <>
                            <p className={styles.clocked}>{`You clocked in at: ${clockIn.toLocaleTimeString()}`}</p>
                            <p className={styles.clocked}>{`You clocked out at: ${clockOut.toLocaleTimeString()}`}</p>
                            <button className={styles.clockInAgainBtn} onClick={resetClock}>
                                Clock In Again
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={styles.clockOutBtn}
                                onClick={handleClockOut}
                                disabled={buttonDisabled}
                            >
                                Clock Out
                            </button>
                            <p className={styles.clocked}>{`You clocked in at: ${clockIn.toLocaleTimeString()}`}</p>
                        </>
                    )}
                </div>
            )}
            {!clockIn && (
                <button
                    className={styles.clockInBtn}
                    onClick={handleClockIn}
                    disabled={buttonDisabled}
                >
                    Clock In
                </button>
            )}
        </div>
    );
}

export default NonAdmin;
