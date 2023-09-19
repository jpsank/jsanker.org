import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Button, Card, Col, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { compareDates, truncate } from "../utils/helper";
import Skeleton from 'react-loading-skeleton';

const DEFAULT_CONTENT = `# Hello World

This is a blog post.`;


const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
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
        <div>
            {/* <h1>Blogs</h1> */}
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
        </div>
    )
};

export default Blogs;
