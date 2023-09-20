import { useRef } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import FidgetWidget from "../components/games/FidgetWidget";
import ConwayCanvas from "../components/games/ConwayCanvas";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
            <Row className="mt-5 d-flex flex-sm-row flex-column justify-content-center align-items-center">
                <Col className="d-flex flex-md-row flex-column justify-content-center align-items-center">
                    <Col sm={4} className="d-flex justify-content-center m-4" style={{width: "120px", height: "100px"}}>
                        <FidgetWidget height="100px" width="100px" />
                    </Col>
                    <Col className="text-md-start text-center">
                        <h2>Julian Sanker</h2>
                        <h5>CS @ Yale. Interested in full-stack web development, computational biology, and machine learning.</h5>
                        <Link to="https://www.linkedin.com/in/juliansanker">
                            <Button href="https://www.linkedin.com/in/juliansanker" target="_blank" rel="noreferrer">
                                <i className="fa fa-linkedin fa-1x"></i>
                            </Button>
                        </Link>
                        <Link to="https://github.com/jpsank">
                            <Button href="https://github.com/jpsank" target="_blank" rel="noreferrer">
                                <i className="fa fa-github fa-1x"></i>
                            </Button>
                        </Link>
                    </Col>
                </Col>
                <Col className="d-flex flex-md-row flex-column justify-content-center align-items-center">
                    <Col className="p-1">
                        <img style={{width: "100%", maxWidth: "400px"}} src="img/me690.png" alt="Julian Sanker" />
                    </Col>
                    <Col className="p-1">
                        <img style={{width: "100%", maxWidth: "400px"}} src="img/sp690.png" alt="Julian Sanker" />
                    </Col>
                </Col>
            </Row>
            
            <Row className="my-5 py-5 d-flex flex-row justify-content-center align-items-center">
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <ConwayCanvas width="800px" height="500px" style={{boxShadow: "0 5px 40px #eee", maxWidth: "100%"}} />
                    <h6 className="mt-2">John Conway's Game of Life</h6>
                </Col>
            </Row>
        </>
    );
};

export default Home;
