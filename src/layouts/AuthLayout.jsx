import {Outlet} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

export default function AuthLayout() {
    return (
        <div className="min-vh-100 d-flex justify-content-center flex-column align-items-center">
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col md={8} lg={5} xl={4}>
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}