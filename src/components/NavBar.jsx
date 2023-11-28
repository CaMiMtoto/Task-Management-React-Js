import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

function NavBar() {
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user)
        return <></>;
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/auth/login');
    }

    return (<Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand>
                <Link to={'/'} className="text-decoration-none text-dark-emphasis">
                    Task Manager
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="#home" as="div">
                        <Link to={'/'} className="text-decoration-none text-dark-emphasis">
                            Home
                        </Link>
                    </Nav.Link>
                    <Nav.Link as="div">
                        <Link to={'/tasks'} className="text-decoration-none text-dark-emphasis">
                            Tasks
                        </Link>
                    </Nav.Link>
                    <NavDropdown title={user.name} id="basic-nav-dropdown">

                        <NavDropdown.Item as="div" className="tw-cursor-pointer">
                            <Link to={'/my-profile'} className="text-decoration-none text-dark">
                                Profile
                            </Link>
                        </NavDropdown.Item>

                        <NavDropdown.Item as="div" className="tw-cursor-pointer">
                            <Link to={'/change-password'} className="text-decoration-none text-dark">
                                Change Password
                            </Link>
                        </NavDropdown.Item>

                        <NavDropdown.Item as="div" className="tw-cursor-pointer" onClick={handleLogout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
}

export default NavBar;