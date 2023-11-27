import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import {Container} from "react-bootstrap";

export default function AppLayout() {

    let user = JSON.parse(localStorage.getItem('user'));
    if (!user)
        window.location.href = '/auth/login';

    return (
        <div>
            <NavBar/>
            <Container className="py-4">
                <Outlet/>
            </Container>
        </div>
    );
}