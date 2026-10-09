import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PageLayout from "./components/PageLayout";
import LoadingFallback from "./components/LoadingFallback";
import "./App.css";

// Lazy loading route-based components
const Projects = lazy(() => import("./components/project"));
const Contact = lazy(() => import("./components/Contact"));
const TaskManager = lazy(() => import("./components/TaskManager"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Education = lazy(() => import("./components/Education"));
const Internship = lazy(() => import("./components/Internship"));
const Certifications = lazy(() => import("./components/Certifications"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback message="Loading application..." />}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Header />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/internship" element={<Internship />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/repositories" element={<Navigate to="/projects" replace />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;