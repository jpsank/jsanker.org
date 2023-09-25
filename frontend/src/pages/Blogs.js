import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { compareDates, truncate } from "../utils/helper";
import Skeleton from 'react-loading-skeleton';

const DEFAULT_CONTENT = `# Hello World

This is a blog post.`;


const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "blogs"), orderBy("dateUpdated", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const blogData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBlogs(blogData);
        });
        return () => unsubscribe();
    }, []);

    const createNewBlog = async (e) => {
        e.preventDefault();
        let date = new Date();
        let blog = await addDoc(collection(db, "blogs"), {
            dateCreated: date,
            dateUpdated: date,
            content: DEFAULT_CONTENT,
        });
        navigate("/blogs/edit/" + blog.id);
    };

    return (
        <Container className="my-5 mx-sm-5 mx-0">
            <h1 className="mt-4">Blogs</h1>
            <p>So, I'm learning how to use Firebase, and this is the result. I forgot to implement admin authentication, so anyone can edit these blogs. Also, there is no delete button. I will fix this, soon.</p>
            <div className="d-flex flex-column justify-content-center align-items-left">
                <Button onClick={createNewBlog}>Add a New Blog</Button>
                { blogs.length === 0 ? <Skeleton count={5} height={150} /> : blogs.map((blog) => (
                    <Card key={blog.id} className="my-3">
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">
                                {blog.dateCreated.toDate().toLocaleDateString()} {compareDates(blog.dateCreated, blog.dateUpdated) !== 0 ? "(updated " + blog.dateUpdated.toDate().toLocaleDateString() + ")" : ""}
                            </Card.Subtitle>
                            <Card.Text>
                                <Link to={"/blogs/" + blog.id} className="text-decoration-none text-black">
                                    <ReactMarkdown>
                                        {truncate(blog.content)}
                                    </ReactMarkdown>
                                </Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    )
};

export default Blogs;
