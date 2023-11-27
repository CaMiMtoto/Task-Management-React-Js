import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

function NavBar() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user)
        return <></>;
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
    }

    return (<Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand>
                <Link to={'/home'} className="text-decoration-none text-dark-emphasis">
                    Task Manager
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link as="div">
                        <Link to={'/tasks'} className="text-decoration-none text-dark-emphasis">
                            Tasks
                        </Link>
                    </Nav.Link>
                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as="div" onClick={handleLogout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
}

export default NavBar;