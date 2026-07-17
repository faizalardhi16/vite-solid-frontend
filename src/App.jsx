import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { TasksPage } from "@/pages/TasksPage";
import { LoginPage } from "@/pages/LoginPage";

/**
 * App — SINGLE RESPONSIBILITY: define routes and layout shell.
 * Only routing + top-level layout composition.
 */
export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}
