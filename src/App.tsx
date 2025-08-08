/**
 * Main Application Component
 * Sets up routing and global layout for the Lorcana Deck Builder
 */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

// Page Components
import Header from "./components/Header";
import CardDetails from "./routes/CardDetails";
import Builder from "./routes/Builder";
import Decks from "./routes/Decks";
import About from "./routes/About";

/**
 * Application routes configuration
 */
const APP_ROUTES = [
  { path: "/", element: <Builder /> },
  { path: "/builder", element: <Builder /> },
  { path: "/card/:id", element: <CardDetails /> },
  { path: "/decks", element: <Decks /> },
  { path: "/about", element: <About /> },
] as const;

/**
 * Main App component that provides routing and global layout
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        {/* Background Image */}
        <div
          aria-hidden
          className="fixed inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url(/art/aurora-bg.svg)" }}
        />

        {/* Application Header */}
        <Header />

        {/* Main Content Container */}
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Routes>
            {APP_ROUTES.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}
