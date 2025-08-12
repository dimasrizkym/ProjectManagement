import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";
import { Toaster } from "sonner";
import SignUpPage from "./pages/SignUpPage.tsx";
import AuthLayout from "./pages/layouts/AuthLayout.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import ProjectPage from "./pages/projects/ProjectPage.tsx";
import ManageJobsPage from "./pages/manageJobs/ManageJobsPage.tsx";

const root = document.getElementById("root") as HTMLElement;

const publicRoutes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
];

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Toaster duration={2000} position="top-right" />
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route
          path={path}
          element={<PublicRoute>{element}</PublicRoute>}
          key={path}
        />
      ))}
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/manage-jobs/">
          <Route path=":projectId" element={<ManageJobsPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
