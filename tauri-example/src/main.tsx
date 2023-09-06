import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app";
import HomePage from "./pages/home";
import NotesPage from "./pages/notes";
import SearchPage from "./pages/search";
import "./global.css";

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
