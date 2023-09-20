import React from "react";
import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const ProjectCard = ({title, img, link, description}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Card className="m-1 p-2" style={{maxWidth: "500px", border: "none"}}>
            <Card.Title>{title}</Card.Title>
            <a href={link}>
                <Card.Img src={img} onLoad={() => setLoaded(true)} />
                {
                    !loaded && <Skeleton height={250} />
                }
            </a>
            <Card.Body>{description}</Card.Body>
        </Card>
    );
};


const Projects = () => {
    return (
        <>
            <Row className="mt-5">
                <h1>Projects</h1>
                <p>These are some of my personal projects. These are all from high school, so if you want to see my recent projects, <a href="mailto:julian@sankergroup.org">send me an email</a> telling me to finish my website.</p>
            </Row>
            <Row className="mt-5 d-flex flex-row flex-wrap justify-content-around align-items-top">
                <ProjectCard
                    title="Crime Map"
                    img="img/old/crimemap2.png"
                    link="https://crimemap.app/"
                    description="Interactive map of 911 dispatches to inform Fayetteville residents of danger nearby. Written by Lucas Kellar and me for the 2019 JB Hunt Hackathon."
                />
                <ProjectCard
                    title="OpenChat"
                    img="img/old/openchat2.png"
                    link="/openchat/"
                    description="A new Reddit-like social media site--the successor to the previous Classic OpenChat."
                />
                <ProjectCard
                    title="uMusic"
                    img="img/old/uMusic2.png"
                    link="/uMusic/"
                    description="Ad-free music streaming platform featuring songs from top charts on SoundCloud."
                />
                <ProjectCard
                    title="CoronaRiskMap"
                    img="img/old/coronariskmap.png"
                    link="/coronamap/"
                    description="A daily-updating choropleth map that shows confirmed COVID-19 cases per intensive-care bed for each US state."
                />
            </Row>
            <Row className="mt-5 d-flex flex-row justify-content-around align-items-top" style={{border: "1px solid #eee", padding: "10px", margin: "10px"}}>
                <ProjectCard
                    title="HHA Grades"
                    img="img/old/hha-grades.png"
                    link="/hha-grades/"
                    description="Easy grade checker for Haas Hall scholars."
                />
                <ProjectCard
                    title="APedia"
                    img="img/old/apedia.png"
                    link="https://puffyboa.xyz/projects/apedia/"
                    description="Crowd-sourced Q and A for AP classes."
                />
                <ProjectCard
                    title="Classic OpenChat"
                    img="img/old/classic-openchat.png"
                    link="https://puffyboa.xyz/projects/openchat/"
                    description="The old open ledger for posting anonymous public messages."
                />
                <ProjectCard
                    title="ChemCalc"
                    img="img/old/chemcalc2.png"
                    link="https://puffyboa.xyz/projects/chemcalc/"
                    description="Calculate thermodynamic properties of chemical equations and molecules (AP Chem)."
                />
                <ProjectCard
                    title="Audiovisual.js"
                    img="img/old/audiovisual-js.png"
                    link="https://puffyboa.xyz/projects/audiovisual/"
                    description="Simplified web version of my audiovisual project to visualize your music files with particle animations."
                />
                <ProjectCard
                    title="Speedreed"
                    img="img/old/speedreed.png"
                    link="https://puffyboa.xyz/projects/speedreed/"
                    description="Browse and read a collection of my favorite books with speed."
                />
                <ProjectCard
                    title="WireWorld"
                    img="img/old/wireworld.png"
                    link="https://puffyboa.xyz/projects/wireworld/"
                    description="My implementation of the popular Turing-complete cellular automaton to simulate electronic logic elements."
                />
                <ProjectCard
                    title="Lucas Gifs"
                    img="img/old/lucas_gifs.png"
                    link="https://puffyboa.xyz/projects/lucas_gifs/"
                    description="Something (terrible) from middle school."
                />
            </Row>
        </>
    );
};

export default Projects;
