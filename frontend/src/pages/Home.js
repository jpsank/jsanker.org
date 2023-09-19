import { useRef } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import FidgetWidget from "../components/games/FidgetWidget";
import ConwayCanvas from "../components/games/ConwayCanvas";

const ProjectCard = ({title, img, link, description}) => {
    return (
        <Card>
            <Card.Title>{title}</Card.Title>
            <a href={link}>
                <Card.Img src={img} alt="" />
            </a>
            <Card.Body>{description}</Card.Body>
        </Card>
    );
};

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

            <Row className="mt-5 d-flex flex-row">
                <Col>
                    <ProjectCard
                        title="Crime Map"
                        img="img/old/crimemap2.png"
                        link="https://crimemap.app/"
                        description="Interactive map of 911 dispatches to inform Fayetteville residents of danger nearby. Written by Lucas Kellar and me for the 2019 JB Hunt Hackathon"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="OpenChat"
                        img="img/old/openchat2.png"
                        link="/openchat/"
                        description="A new Reddit-like social media site--the successor to the previous Classic OpenChat"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="uMusic"
                        img="img/old/uMusic2.png"
                        link="/uMusic/"
                        description="Ad-free music streaming platform featuring songs from top charts on SoundCloud"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="CoronaRiskMap"
                        img="img/old/coronariskmap.png"
                        link="/coronamap/"
                        description="A daily-updating choropleth map that shows confirmed COVID-19 cases per intensive-care bed for each US state"
                    />
                </Col>
            </Row>
            <Row className="mt-5 d-flex flex-row" style={{border: "1px solid #eee", padding: "10px", margin: "10px"}}>
                <Col>
                    <ProjectCard
                        title="HHA Grades"
                        img="img/old/hha-grades.png"
                        link="/hha-grades/"
                        description="Easy grade checker for Haas Hall scholars"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="APedia"
                        img="img/old/apedia.png"
                        link="https://puffyboa.xyz/projects/apedia/"
                        description="Crowd-sourced Q and A for AP classes"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="Classic OpenChat"
                        img="img/old/classic-openchat.png"
                        link="https://puffyboa.xyz/projects/openchat/"
                        description="The old open ledger for posting anonymous public messages"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="ChemCalc"
                        img="img/old/chemcalc2.png"
                        link="https://puffyboa.xyz/projects/chemcalc/"
                        description="Calculate thermodynamic properties of chemical equations and molecules (AP Chem)"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="Audiovisual.js"
                        img="img/old/audiovisual-js.png"
                        link="https://puffyboa.xyz/projects/audiovisual/"
                        description="Simplified web version of my audiovisual project to visualize your music files with particle animations"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="Speedreed"
                        img="img/old/speedreed.png"
                        link="https://puffyboa.xyz/projects/speedreed/"
                        description="Browse and read a collection of my favorite books with speed"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="WireWorld"
                        img="img/old/wireworld.png"
                        link="https://puffyboa.xyz/projects/wireworld/"
                        description="My implementation of the popular Turing-complete cellular automaton to simulate electronic logic elements"
                    />
                </Col>
                <Col>
                    <ProjectCard
                        title="Lucas Gifs"
                        img="img/old/lucas_gifs.png"
                        link="https://puffyboa.xyz/projects/lucas_gifs/"
                        description="Something (terrible) from middle school"
                    />
                </Col>
            </Row>
        </>
    );
};

export default Home;
