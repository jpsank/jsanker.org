import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Container } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, register, error, setError, sendVerificationEmail } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Reset error when password or confirmPassword changes
    setError("");
  }, [password, confirmPassword, email, setError]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await register(email, password);
      await sendVerificationEmail();
      navigate("/profile");
    } catch (e) {
      setError("Failed to register");
    }
    setLoading(false);
  }

  return (
    <Container className="my-5 mx-auto text-center" style={{maxWidth: "500px"}}>
      <h2>Register</h2>
      <p>Register for an account.</p>
      { error && <p style={{ color: "red" }}>{error}</p> }
      <form onSubmit={handleFormSubmit} className="w-100">
        <div className="mb-3">
          <input
            type="email" required className="form-control" id="email" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className="mb-3">
          <input 
            required type="password" className="form-control" id="password" placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <div className="mb-3">
          <input 
            required type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" 
            onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        </div>
        <Button type="submit" disabled={loading}>
          Create Account {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
        </Button>
      </form>
      <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
    </Container>
  );
}

export default Register;
