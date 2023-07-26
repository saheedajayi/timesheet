import { useState } from "react";
import styles from "../dashboard/styles/NonAdminTable.module.css";
import Nav from "./Nav.jsx";
import profilePicture2 from "../../assets/passport-2.webp";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice.js";
import UpdateEmployeeForm from "./UpdateEmployeeForm.jsx";

function NonAdminTable() {
    const { users } = useSelector((state) => state.users);
    const { clocks } = useSelector((state) => state.clocks);

    const dispatch = useDispatch();

    const nonAdminUsers = users.filter((user) => user.role !== "admin");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleDeleteEmployee = (userId) => {
        dispatch(userActions.deleteUser(userId));
    };

    const handleEditInfo = (userId) => {
        setSelectedUserId(userId);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedUserId(null);
        setIsEditModalOpen(false);
    };

    const selectedUser = nonAdminUsers.find((user) => user.id === selectedUserId);
    const selectedUserClocks = clocks.filter((clock) => clock.id === selectedUserId);


    const handleViewEmployee = (userId) => {
        setSelectedUserId(userId);
    };

    const closeModal = () => {
        setSelectedUserId(null);
    };

    return (
        <div>
            <Nav />
            <div className={styles.empDetailsContainer}>
                <div className={styles.employeeDetails}>
                    <h2>Employee Details</h2>
                </div>
                {nonAdminUsers.map((user) => (
                    <div key={user.id} className={styles.tableContentDiv}>
                        <div className={styles.tableContent}>
                            <div className={styles.user}>
                                <img src={profilePicture2} alt="" />
                                <p>{user.fullname}</p>
                            </div>
                            <div>
                                <button
                                    className={styles.viewEmp}
                                    onClick={() => handleViewEmployee(user.id)}
                                >
                                    View Employee
                                </button>
                                <button
                                    className={styles.editInfo}
                                    onClick={() => handleEditInfo(user.id)}
                                >
                                    Edit Info
                                </button>
                                <button
                                    className={styles.delete}
                                    onClick={() => handleDeleteEmployee(user.id)}
                                >
                                    Delete Employee
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedUserId && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            X
                        </button>
                        {nonAdminUsers.map((user) =>
                            user.id === selectedUserId ? (
                                <div key={user.id}>
                                    <div className={styles.userDetails}>
                                        <img src={profilePicture2} alt="" />
                                        <p>Name: {user.fullname}</p>
                                        <p>Employee ID: {user.id}</p>
                                        <p>Role: {user.role}</p>
                                        {/* Display clock information for the selected user */}
                                        {selectedUserClocks.map((clock) => (
                                            <div className={styles.clockDateAndTime} key={clock.id}>
                                                <p>Status: {clock.status}</p>
                                                <p>Time: {clock.time.toLocaleTimeString()}</p>
                                                <p>Date: {clock.time.toLocaleDateString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            )}


            {selectedUser && isEditModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <button className={styles.closeButton} onClick={closeEditModal}>
                            X
                        </button>
                        <UpdateEmployeeForm employee={selectedUser} onClose={closeEditModal} />
                    </div>
                </div>
            )}

        </div>
    );
}

export default NonAdminTable;
