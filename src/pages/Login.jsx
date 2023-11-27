import {useState} from "react";
import {Spinner} from "react-bootstrap";
import http from "../configs/httpConfig.js";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: '', password: ''
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
        console.log('login');
        http.post('/auth/login', {
            email: formData.email,
            password: formData.password
        })
            .then((response) => {
                console.log(response);
                const jwt = response.data.token;
                localStorage.setItem('token', jwt);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.user._id,
                    name: response.data.user.name,
                    email: response.data.user.username
                }));
                navigate('/home')
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setError(error.response.data.message ?? 'Something went wrong');
            });
    }

    return (<div className="card card-body py-5 px-4">
        <div className="">
            <h2>Login</h2>
            <p>
                Please fill in your credentials to login
            </p>
        </div>

        {error && <div className="alert alert-danger rounded-1">{error}</div>

        }

        <form onSubmit={handleSubmit} autoComplete="off">
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
                Login
                {loading && <Spinner animation="border" size="sm"/>}
            </button>
            <p className="mt-4 text-center">
                Don't have an account? <Link to={'/auth/register'}>Register</Link>
            </p>
        </form>
    </div>);
}

export default Login;