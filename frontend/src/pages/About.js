import { Button, Col, Row, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ParallaxBanner } from 'react-scroll-parallax';
import styled from 'styled-components';

const CarouselImage = styled.img`
    height: 550px;
    object-fit: cover;
    width: 100%;
`;


const About = () => {
    return (
        <>
            <Row className="d-flex flex-row text-center justify-content-center align-items-center">
                <ParallaxBanner
                    layers={[
                        { image: 'img/photos/IMG_8387.jpg', translateY: [-40, 10] },
                        {
                            translateY: [69, 65],
                            children: (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-8xl text-white roboto">Lake Fayetteville, Arkansas</h3>
                                </div>
                            )
                        }
                    ]}
                    style={{height: "520px", boxShadow: "0 5px 40px #rgba(0,0,0,0.2)"}}
                    className="aspect-[2/1]"
                />
            </Row>
            <Row className="my-5 mx-auto d-flex flex-row justify-content-center align-items-top" style={{width: "900px", maxWidth: "100%"}}>
                <Col md={4} className="p-4 text-center">
                    <img className="border" style={{width: "100%", maxWidth: "400px"}} src="img/me in dive.jpeg" alt="Julian Sanker" />
                </Col>
                <Col className="p-4">
                    <h1>About</h1>
                    <p>I'm Julian Sanker, a junior studying Computer Science at Yale University, from Northwest Arkansas.</p>
                    <p>I enjoy software development, particularly building websites and useful apps. I'm looking for jobs and research in software engineering, artificial intelligence, and computational biology.</p>
                    <p>Reach out to me at <a href="mailto:julian@sankergroup.org">julian@sankergroup.org</a> or <a href="https://calendly.com/juliansanker">schedule a meeting</a>.</p>
                </Col>
            </Row>
            <Row className="mt-5 d-flex flex-row text-center justify-content-center align-items-center">
                <Carousel className="p-0">
                    <Carousel.Item>
                        <CarouselImage src="img/photos/lake.jpeg" alt="Lake Fayetteville, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Lake Fayetteville, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselImage src="img/photos/cat.jpeg" alt="Johnson, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Johnson, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselImage src="img/photos/blessings.jpeg" alt="Johnson, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Johnson, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselImage src="img/photos/doorway.jpeg" alt="Johnson, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Johnson, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselImage src="img/photos/car.jpeg" alt="Fayetteville, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Fayetteville, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselImage src="img/photos/deer.jpeg" alt="Fayetteville, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Fayetteville, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselImage src="img/photos/fence1.jpeg" alt="Fayetteville, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Fayetteville, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselImage src="img/photos/log.jpeg" alt="Fayetteville, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Fayetteville, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselImage src="img/photos/fence2.jpeg" alt="Fayetteville, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Fayetteville, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselImage src="img/photos/twilight.jpeg" alt="Fayetteville, Arkansas" />
                        <Carousel.Caption>
                            <h3 className="roboto">Fayetteville, Arkansas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Row>
        </>
    );
};

export default About;
