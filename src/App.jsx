import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExperienceDetail from "./pages/ExperienceDetail";
import ProjectDetail from "./pages/ProjectDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="experience/:id" element={<ExperienceDetail />} />
        <Route path="project/:id" element={<ProjectDetail />} />
      </Route>
    </Routes>
  );
}
