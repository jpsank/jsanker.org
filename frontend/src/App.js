import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import BlogView from "./pages/BlogView";
import BlogEdit from "./pages/BlogEdit";
import NoPage from "./pages/NoPage";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import Profile from "./components/accounts/Profile";
import ForgotPassword from "./components/accounts/ForgotPassword";
import WithPrivateRoute from "./utils/WithPrivateRoute";

export default function App() {
  return (
    <AuthProvider>
      <ParallaxProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />

              <Route path="blogs">
                <Route index element={<Blogs />} />
                {/* <Route path="search/:search?" element={<Blogs />} /> */}
                <Route path="by/:authorId" element={<Blogs />} />
                <Route path=":id" element={<BlogView />} />
                <Route path=":id/edit" element={<WithPrivateRoute><BlogEdit /></WithPrivateRoute>} />
              </Route>
              
              <Route exact path="register" element={<Register />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="profile" element={<WithPrivateRoute><Profile /></WithPrivateRoute>}/>
              <Route exact path="forgot-password" element={<ForgotPassword />} />

              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ParallaxProvider>
    </AuthProvider>
  );
}
