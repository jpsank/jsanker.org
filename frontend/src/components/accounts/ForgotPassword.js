import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Container } from "react-bootstrap";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { currentUser, resetPassword } = useAuth();

    useEffect(() => {
        if (currentUser) {
            navigate("/profile");
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        // Reset error when form changes
        setError("");
    }, [email, setError]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setMessage("");
            setLoading(true);
            let res = await resetPassword(email);
            if (!res) {
                setError("Failed to reset password");
            } else {
                setMessage("Check your inbox for further instructions");
            }
        } catch (e) {
            setError("Failed to reset password");
        }
        setLoading(false);
    }

    return (
        <Container className="my-5 mx-auto text-center" style={{maxWidth: "500px"}}>
            <h2>Forgot Password</h2>
            <p>Enter your email address and we will send you a link to reset your password.</p>
            { error && <p style={{ color: "red" }}>{error}</p> }
            { message && <p style={{ color: "green" }}>{message}</p> }
            <form onSubmit={handleFormSubmit} className="w-100">
                <input
                    type="email" required className="form-control mb-3" id="email" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <Button type="submit" disabled={loading}>
                    Submit {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                </Button>
            </form>
            <p className="mt-5 mb-0">Know your password? <Link to="/login">Login</Link></p>
            <p>Need an account? <Link to="/register">Register</Link></p>
        </Container>
    );
}

export default ForgotPassword;