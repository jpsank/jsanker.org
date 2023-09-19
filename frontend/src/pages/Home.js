import { useRef } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import FidgetWidget from "../components/games/FidgetWidget";
import ConwayCanvas from "../components/games/ConwayCanvas";

const Home = () => {
    return (
        <>
            <Row className="mt-5 d-flex flex-sm-row flex-column justify-content-center align-items-center">
                <Col className="d-flex flex-md-row flex-column justify-content-center align-items-center">
                    <Col sm={4} className="d-flex justify-content-left m-4" style={{width: "100px", height: "100px"}}>
                        <FidgetWidget height="100px" width="100px" />
                    </Col>
                    <Col className="text-md-start text-center">
                        <h2>Julian Sanker</h2>
                        <h5>CS @ <span style={{color: "#00356B"}}>Yale</span>. Interested in full-stack web development, computational biology, and machine learning.</h5>
                        <Button href="https://www.linkedin.com/in/juliansanker" target="_blank" rel="noreferrer">
                            <i className="fa fa-linkedin fa-1x"></i>
                        </Button>
                        <Button href="https://github.com/jpsank" target="_blank" rel="noreferrer">
                            <i className="fa fa-github fa-1x"></i>
                        </Button>
                    </Col>
                </Col>
                <Col className="d-flex flex-md-row flex-column justify-content-center align-items-center">
                    <Col className="p-1">
                        <img style={{width: "100%"}} src="img/me690.png" alt="Julian Sanker" />
                    </Col>
                    <Col className="p-1">
                        <img style={{width: "100%"}} src="img/sp690.png" alt="Julian Sanker" />
                    </Col>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="mt-5">
                    <ConwayCanvas height="500px" width="500px" />
                </Col>
            </Row>
        </>
    );
};

export default Home;
