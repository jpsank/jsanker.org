import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { compareDates } from "../utils/helper";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../contexts/AuthContext";

const BlogView = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [blog, setBlog] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "blogs", params.id), (doc) => {
            if (!doc.exists()) {
                navigate("/404");
                return;
            }
            setBlog(doc.data());
        });
        return () => unsubscribe();
    }, [params.id, navigate]);

    return (
        <Container className="my-5 mx-sm-5 mx-0">
            { blog === null ? <Skeleton count={15} containerClassName="mt-5" /> : (
                <>
                    <p>{blog.dateCreated.toDate().toLocaleDateString()} {compareDates(blog.dateCreated, blog.dateUpdated) ? "(updated " + blog.dateUpdated.toDate().toLocaleDateString() + ")" : ""}</p>
                    <p>By <Link to={`/blogs/by/${blog.authorId}`}>{blog.authorName}</Link></p>
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                    { currentUser && currentUser.uid === blog.authorId && 
                        <Link to={`/blogs/${params.id}/edit`}>Edit</Link>
                    }
                    
                </>
            )}
        </Container>
    );
}

export default BlogView;
