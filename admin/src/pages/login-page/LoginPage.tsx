import { useState } from 'react';
import { Button } from 'react-bootstrap';
import './LoginPage.css'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom'

import AuthService from '../../services/auth.service'
import { RouteComponentProps } from 'react-router';

interface RouterProps {
    history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    email: string,
    password: string,
    loading: boolean,
    message: string
}


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();


    const validationSchema = () => {
        return Yup.object().shape({
            email: Yup.string().required("This field is required"),
            password: Yup.string().required("This field is required"),
        });
    }

    const handleLogin = (formValue: { email: string; password: string; }) => {
        const { email, password } = formValue;

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
        <div className="col-md-12">
            <div className="card card-container">
                <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className="form-control" />
                            <ErrorMessage
                                name="email"
                                component="span"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage
                                name="password"
                                component="span"
                            />
                        </div>

                        <div className="form-group">
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
    );
}

export default LoginPage;