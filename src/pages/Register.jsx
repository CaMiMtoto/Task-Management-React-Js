import {useState} from "react";
import {Spinner} from "react-bootstrap";
import http from "../configs/httpConfig.js";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        http.post('/auth/register', {
            phone: formData.phone,
            name: formData.name,
            email: formData.email,
            password: formData.password
        })
            .then((response) => {
                const jwt = response.data.token;
                localStorage.setItem('token', jwt);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.user._id,
                    name: response.data.user.name,
                    email: response.data.user.username
                }));
                navigate('/')
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response.data.message ?? 'Something went wrong');
            });
    }

    return (<div className="card card-body py-5 px-4">
        <div className="">
            <h2>
                Register
            </h2>
            <p>
                Please fill in your credentials to create an account
            </p>
        </div>

        {error && <div className="alert alert-danger rounded-1">{error}</div>

        }

        <form onSubmit={handleSubmit} autoComplete="off">

            <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" name="name" onChange={handleChange}
                       required={true}/>
            </div>

            <div className="mb-4">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" className="form-control" name="phone" onChange={handleChange}
                       required={true}/>
            </div>

            <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" name="email" onChange={handleChange}
                       required={true}/>
            </div>
            <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" name="password" required={true}
                       onChange={handleChange}/>
            </div>
            <button className="btn btn-primary d-inline-flex justify-content-center align-items-center gap-2 w-100"
                    disabled={loading}>
                Register
                {loading && <Spinner animation="border" size="sm"/>}
            </button>

            <p className="mt-4 text-center">
                Already have an account? <Link to={'/auth/login'}>Login</Link>
            </p>
        </form>
    </div>);
}

export default Register;