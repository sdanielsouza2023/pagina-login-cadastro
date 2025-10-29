import { AnchorButton } from "../../components/AnchorButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import React, { useState } from "react";

import "./styles.css";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  function goToResgistration() {
    navigate("./Cadastro");
  }

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Mensagem com tipo (erro ou sucesso)
  const [mensagem, setMensagem] = useState<{
    text: string;
    type: "error" | "success" | "";
  }>({ text: "", type: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function enviarDados(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensagem({ text: "", type: "" });

    // Validação básica
    if (!emailRegex.test(email)) {
      setMensagem({ text: "Formato de email inválido", type: "error" });
      return;
    }
    if (!senha) {
      setMensagem({ text: "Senha é obrigatória", type: "error" });
      return;
    }

    try {
      // Transformar email em minúsculas antes de enviar
      const emailLower = email.toLowerCase();

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailLower, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensagem({
          text: data.message || "Erro ao fazer login",
          type: "error",
        });
        return;
      }

      // Sucesso
      setMensagem({ text: "Login bem-sucedido!", type: "success" });

      // Aqui você pode salvar o token, redirecionar, etc.
      console.log("Login bem-sucedido", data);
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setMensagem({ text: "Erro ao conectar com o servidor", type: "error" });
    }
  }

  return (
    <div className="container">
      <div className="login">
        <div className="header">
          <h1 className="title">Login</h1>
          {mensagem.text && (
            <p style={{ color: mensagem.type === "error" ? "red" : "green" }}>
              {mensagem.text}
            </p>
          )}
          <p className="login-info">
            Entre com seu email e senha para acessar sua conta
          </p>
        </div>
        <form onSubmit={enviarDados}>
          <Input
            label="Login:"
            name="login"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha:"
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button label="Login" type="submit" />

          <span> Não tem uma conta? </span>

          <AnchorButton onClick={goToResgistration} name="Cadastre-se" />
        </form>
      </div>
    </div>
  );
}
