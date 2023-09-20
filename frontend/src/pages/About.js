import { Col, Row } from "react-bootstrap";
import { ParallaxBanner } from 'react-scroll-parallax';


const About = () => {
    return (
        <>
            <Row className="mt-5 d-flex flex-row text-center justify-content-center align-items-center">
                <ParallaxBanner
                    layers={[{ image: 'img/IMG_8387.jpg', translateY: [-50, 0] }]}
                    style={{height: "500px", boxShadow: "0 5px 40px #rgba(0,0,0,0.2)"}}
                    className="aspect-[2/1]"
                />
                <h6 className="mt-2">Lake Fayetteville, Arkansas</h6>
            </Row>
            <Row className="mt-5 d-flex flex-row justify-content-center align-items-top">
                <Col>
                    <h1>About</h1>
                    <p>My name is Julian Sanker. I grew up in Northwest Arkansas, and I am studying Computer Science at Yale University. I am making this website to show people what I've been up to.</p>
                    <p>I'm looking for jobs in software engineering, artificial intelligence, and computational biology. I'm also interested in research in these fields.</p>
                    <p>But mostly I just want to procrastinate.</p>
                    {/* <p>My hobbies include making music, skateboarding, and playing basketball at the park.</p>
                    <p>My favorite programming language is Python, and I'm proficient in JavaScript, R, C, and Java.</p>
                    <p>My favorite music genres are hip-hop and alt rock, from artists like Kendrick Lamar and Coldplay.</p>
                    <p>My favorite books are <i>Ender's Game</i>, <i>Life of Pi</i>, and <i>Shogun</i>. I also like books by Ted Chiang and Khaled Hosseini.</p> */}
                </Col>
                <Col md={4} className="pe-0">
                    <img style={{width: "100%", maxWidth: "400px"}} src="img/me in dive.jpeg" alt="Julian Sanker" />
                </Col>
            </Row>
        </>
    );
};

export default About;
