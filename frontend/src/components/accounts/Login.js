import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Container } from "react-bootstrap";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, login, error, setError, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Reset error when form changes
    setError("");
  }, [email, password, setError]);

  const handleLoginWithGoogle = async () => {
    try {
      setError("");
      await loginWithGoogle();
      navigate("/profile");
    } catch (e) {
      setError("Failed to login with Google");
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/profile");
    } catch (e) {
      setError("Incorrect email or password");
    }
    setLoading(false);
  }

  return (
    <Container className="my-5 mx-auto text-center" style={{maxWidth: "500px"}}>
      <h2>Sign in</h2>
      <p>Sign in to your account.</p>
      { error && <p style={{ color: "red" }}>{error}</p> }
      <form onSubmit={handleFormSubmit} className="w-100 text-center">
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
        <Button type="submit" disabled={loading}>
          Login {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
        </Button>
      </form>
      <Button className="mt-3" onClick={handleLoginWithGoogle}>
        Sign in with Google
      </Button>
      <div className="mt-5">
        <Link to="/forgot-password">Forgot Password?</Link>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </Container>
  );
}

export default Login;
