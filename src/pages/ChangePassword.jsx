import {useState} from "react";
import http from "../configs/httpConfig.js";
import {Alert, Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

export default function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        http.post('/auth/change-password', {
            old_password: formData.oldPassword,
            new_password: formData.newPassword,
            confirm_password: formData.confirmPassword
        })
            .then(response => {
                const jwt = response.data.token;
                localStorage.setItem('token', jwt);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.user._id,
                    name: response.data.user.name,
                    email: response.data.user.email
                }));
                toast('Password changed successfully', {
                    type: 'success',
                    position: 'top-center'
                });
            }).catch(error => {
            setError(error.response.data.error ?? 'Something went wrong');
        }).finally(() => {
            setLoading(false);
        })


    }
    return (
        <div>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={'/my-profile'}>
                            Profile
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Change Password
                    </li>
                </ol>
            </nav>


            <Row>
                <Col md={8} xl={6}>
                    <div className="card card-body  px-4">
                        <h4 className="my-3">ChangePassword</h4>

                        {error && <Alert variant="danger" dismissible={false} className="rounded-1">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Old Password
                                </Form.Label>
                                <Form.Control type="password" required
                                              value={formData.oldPassword} name="oldPassword" onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    New Password
                                </Form.Label>
                                <Form.Control type="password" required  minLength={4}
                                              value={formData.newPassword} name="newPassword" onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Confirm Password
                                </Form.Label>
                                <Form.Control type="password" required
                                              value={formData.confirmPassword} name="confirmPassword"
                                              onChange={handleChange}/>
                            </Form.Group>

                            <div className="mb-3">
                                <Button value="primary" type="submit" disabled={loading}
                                        className="d-inline-flex justify-content-between align-items-center gap-2">
                                    Change Password
                                    {
                                        loading && <Spinner size="sm" variant="light"/>
                                    }
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>

        </div>
    )
}