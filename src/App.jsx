import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const ExperienceDetail = lazy(() => import("./pages/ExperienceDetail"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="experience/:id" element={<ExperienceDetail />} />
          <Route path="project/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
