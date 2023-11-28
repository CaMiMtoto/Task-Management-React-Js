import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className="d-flex align-items-center justify-content-center flex-column min-vh-100">
            <h1 className="display-4">
                Oops
            </h1>
            <p>
                Page not found ! Please check the URL in the address bar and try again.
            </p>
            <Link to="/" className="btn btn-primary">
                Go to Home
            </Link>
        </div>
    );
}

export default NotFound;