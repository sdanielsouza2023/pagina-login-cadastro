import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import Cadastro from "./pages/Cadastro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Cadastro",
    element: <Cadastro />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
