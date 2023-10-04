import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Container } from "react-bootstrap";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserProfile, error, setError, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setUsername(currentUser.displayName);
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Reset error when username changes
    setError("");
  }, [username, setError]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const user = currentUser;
      const profile = {
        displayName: username,
      };
      await updateUserProfile(user, profile);
      navigate("/profile");
    } catch (e) {
      setError("Failed to update profile");
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      setError("");
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <Container className="my-5 mx-auto text-center" style={{ maxWidth: "500px" }}>
      <h2>Profile</h2>
      <p>Logged in as: {currentUser && currentUser.email}. {currentUser && currentUser.emailVerified && <span style={{color: "green"}}>Email verified</span>} {currentUser && !currentUser.emailVerified && <span style={{color: "red"}}>Email not verified</span>}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3 d-flex flex-row gap-4 justify-content-center align-items-center">
          <label htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username || ""}
          />
        </div>
        <Button type="submit" disabled={loading}>
          Update {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
        </Button>
      </form>
      <Button className="mt-4" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
