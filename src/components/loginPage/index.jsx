import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from "./styles/loginpage.module.css";
import { FaRegClock } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice.js";
import { useNavigate } from "react-router-dom";

const motivationalWords = [
    "You have the power to make a difference today!",
    "Keep pushing forward; greatness lies in your efforts.",
    "Embrace creativity and find new solutions to challenges.",
    "Together, we achieve more than we could alone.",
    "Strive for excellence in everything you do.",
    "Bounce back stronger from setbacks; you've got this!",
    "Every day is an opportunity for personal and professional growth.",
    "Positive attitudes create positive outcomes. Start your day with a smile!",
    "Your dedication fuels our success. Stay committed to your goals.",
    "Your work matters. Make a positive impact on others' lives."
];

const LoginSchema = Yup.object().shape({
    id: Yup.string().required('Employee Id is required!'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.users);
    const [randomWord, setRandomWord] = useState('');

    useEffect(() => {
        getRandomWord();
    }, []);

    const handleSubmit = (values, helper) => {
        console.log("Input value:", values);
        console.log("Users data:", users);

        const user = users.find((u) => u.id === values.id);
        if (user) {
            dispatch(userActions.login(user));
            navigate("dashboard");
        } else {
            alert("Invalid employee identification number");
        }
        helper.setSubmitting(false);
    };

    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * motivationalWords.length);
        setRandomWord(motivationalWords[randomIndex]);
    };

    return (
        <div className={styles.main}>
            <div className={styles.loginContainer}>
                <div className={styles.header}>
                    <p className={styles.clock}><FaRegClock /></p>
                    <h1 className={styles.headerText}>Time Sheet</h1>
                </div>
                <h2 className={styles.loginText}>Login</h2>
                <p className={styles.motivationalWord}> {randomWord} </p>
                <Formik
                    className={styles.form}
                    initialValues={{ id: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, touched, errors }) => (
                        <Form>
                            <div className={styles.formGroup}>
                                <label htmlFor="username">Employee Identification Number</label>
                                <Field
                                    type="text"
                                    name="id"
                                    placeholder="Employee Id"
                                    className={`${
                                        touched.id && errors.id ? styles['is-invalid'] : ''
                                    }`}
                                />
                                <ErrorMessage name="id" component="div" className={styles.error} />
                            </div>

                            <div className={styles.btnDiv}>
                                <button
                                    className={styles.loginBtn}
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm;
