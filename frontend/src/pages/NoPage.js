import { Container } from "react-bootstrap";


const NoPage = () => {
    return (
        <Container className="my-5 mx-auto text-center" style={{ maxWidth: "500px" }}>
            <h2>404</h2>
            <p>Page not found.</p>
        </Container>
    );
};

export default NoPage;
