import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import Cadastro from './pages/Cadastro';
import "./global.css";
import Cadastro from "./pages/Cadastro";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Cadastro />
  </StrictMode>
);
