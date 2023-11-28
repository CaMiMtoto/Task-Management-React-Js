import {useState} from "react";
import http from "../configs/httpConfig.js";
import {Alert, Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function EditProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        navigate('/auth/login');
    }

    const [formData, setFormData] = useState({
        email: user.email, name: user.name
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        http.put('/auth/profile', {
            name: formData.name, email: formData.email
        })
            .then(response => {
                const jwt = response.data.token;
                localStorage.setItem('token', jwt);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.user._id, name: response.data.user.name, email: response.data.user.email
                }));

                toast('Profile updated successfully', {
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
                        <Link to={'/my-profile'}>Profile</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Profile
                    </li>
                </ol>
            </nav>

            <h4>
                Update Profile
            </h4>
            <div>
                {loading && <div className="d-flex justify-content-center text-primary align-items-center gap-2 my-4">
                    <Spinner size="lg" variant="primary"/>
                    Please wait ...
                </div>}
            </div>
            {!loading && user && <Row>
                <Col md={8} xl={6}>
                    <div className="card card-body py-5 px-4">
                        {error && <Alert variant="danger" dismissible={false} className="rounded-1">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Full name" required
                                              value={formData.name} name="name" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Email address" required
                                              value={formData.email} name="email" onChange={handleChange}/>
                            </Form.Group>

                            <div className="mb-3">
                                <Button value="primary" type="submit">
                                    Update Profile
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>}
        </div>)
}