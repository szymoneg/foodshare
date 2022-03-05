import {useState} from 'react';
import './LoginPage.css'
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useHistory} from 'react-router-dom'

import AuthService from '../../services/auth.service'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();


    const validationSchema = () => {
        return Yup.object().shape({
            email: Yup.string().required("To pole jest wymagane!"),
            password: Yup.string().required("To pole jest wymagane!"),
        });
    }

    const handleLogin = (formValue: { email: string; password: string; }) => {
        const {email, password} = formValue;

        setLoading(true);
        setMessage('');

        AuthService.login(email, password).then(
            () => {
                history.push("/main-page");
                window.location.reload();
            },
            err => {
                console.log(err);
            }
        )
    }

    const initialValue = {
        email: "",
        password: "",
    }

    return (
        <div className="container">
            <h1></h1>
            <div className="col-md-6">
                <div className="card card-container" style={{justifyContent: 'center'}}>
                    <Formik
                        initialValues={initialValue}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        <Form>
                            <div className="custom-input form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className="form-control"/>
                                <ErrorMessage
                                    name="email"
                                    render={msg => <div className="error alert alert-danger" role="alert">{msg}</div>}
                                />
                            </div>

                            <div className="custom-input form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className="form-control"/>
                                <ErrorMessage
                                    name="password"
                                    render={msg => <div className="error alert alert-danger" role="alert">{msg}</div>}
                                />
                            </div>

                            <div className="form-group col-md-3 margin-button">
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>

                            {message && (
                                <span>{message}</span>
                            )}
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
