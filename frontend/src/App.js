import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import BlogView from "./pages/BlogView";
import BlogEdit from "./pages/BlogEdit";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <ParallaxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="blogs">
              <Route index element={<Blogs />} />
              <Route path=":id" element={<BlogView />} />
              <Route path="edit/:id" element={<BlogEdit />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ParallaxProvider>
  );
}
