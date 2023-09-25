import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { compareDates } from "../utils/helper";
import Skeleton from "react-loading-skeleton";

const BlogView = () => {
    const params = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "blogs", params.id), (doc) => {
            setBlog(doc.data());
        });
        return () => unsubscribe();
    }, [params.id]);

    return (
        <div className="my-5 mx-sm-5 mx-0">
            { blog === null ? <Skeleton count={15} containerClassName="mt-5" /> : (
                <>
                    <p>{blog.dateCreated.toDate().toLocaleDateString()} {compareDates(blog.dateCreated, blog.dateUpdated) ? "(updated " + blog.dateUpdated.toDate().toLocaleDateString() + ")" : ""}</p>
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                    <Link to={"/blogs/edit/" + params.id}>Edit</Link>
                </>
            )}
        </div>
    );
}

export default BlogView;
