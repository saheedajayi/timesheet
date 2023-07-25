import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles/AddEmployeeForm.module.css";
import { useDispatch } from 'react-redux';
import {userActions} from "../../store/userSlice.js";


const AddEmployeeSchema = Yup.object().shape({
    id: Yup.string().required("Employee Id is required!"),
    fullname: Yup.string().required("Full name is required!"),
    role: Yup.string().required("Role is required!"),
    // image: Yup.mixed().required("Image is required!")
});

const AddEmployeeForm = ({ onClose }) => {
    const dispatch = useDispatch();

    const handleSubmit = (values, { setSubmitting }) => {
        // Handle form submission logic here (e.g., dispatching an action to add the employee)
        console.log(values);
        dispatch(userActions.addUser(values));
        setSubmitting(false);
        onClose();
    };

    return (
        <Formik
            initialValues={{ id: "", fullname: "", role: "", image: null }}
            validationSchema={AddEmployeeSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, setFieldValue }) => (
                <Form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="id">Employee Identification Number</label>
                        <Field type="text" name="id" placeholder="Employee Id" />
                        <ErrorMessage name="id" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="fullname">Full Name</label>
                        <Field type="text" name="fullname" placeholder="Full Name" />
                        <ErrorMessage
                            name="fullname"
                            component="div"
                            className={styles.error}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="role">Role</label>
                        <Field as="select" name="role" className={styles.selectField}>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="non-admin">Non-Admin</option>
                        </Field>
                        <ErrorMessage name="role" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className={styles.inputFile}
                            onChange={(event) => {
                                setFieldValue("image", event.currentTarget.files[0]);
                            }}
                        />
                        <ErrorMessage name="image" component="div" className={styles.error} />
                    </div>

                    <div className={styles.btnDiv}>
                        <button
                            className={styles.addButton}
                            type="submit"
                            disabled={!isValid}
                        >
                            Add Employee
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddEmployeeForm;
