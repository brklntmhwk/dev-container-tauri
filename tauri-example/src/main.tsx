import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app";
import HomePage from "./pages/home";
import NotesPage from "./pages/notes";
import LogPage from "./pages/log";
import SearchPage from "./pages/search";
import { listenToBackendEvents } from "./services/event";
import "./global.css";

listenToBackendEvents().then(() => console.info("Listen to backend events"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <HomePage />
      </App>
    ),
  },
  {
    path: "/notes",
    element: (
      <App>
        <NotesPage />
      </App>
    ),
  },
  {
    path: "/log",
    element: (
      <App>
        <LogPage />
      </App>
    ),
  },
  {
    path: "/search",
    element: (
      <App>
        <SearchPage />
      </App>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
