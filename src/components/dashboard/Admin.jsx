import { useState } from "react";
import styles from "./styles/Admin.module.css";
import { useNavigate } from "react-router-dom";
import AddEmployeeForm from "./AddEmployeeForm";

function Admin() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const viewEmployee = () => {
        navigate("info");
    };

    return (
        <div>
            <div className={styles.adminBtn}>
                <button className={styles.view} onClick={viewEmployee}>
                    View Employees
                </button>
                <button className={styles.add} onClick={openModal}>
                    Add New Employee
                </button>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            X
                        </button>
                        <AddEmployeeForm onClose={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
