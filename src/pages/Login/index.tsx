import { AnchorButton } from "../../components/AnchorButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import "./styles.css";
import React, { useState } from "react";
export default function Login() {
  //State que controla o form
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setErrorMensagem] = useState("");

  async function enviarDados(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Email", email, "Senha", senha);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: senha,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.log("Erro do backend ", data.message);
        console.log(response.status);
        setErrorMensagem(data.message);
        return;
      }

      //if (data.token) {
      //setErrorMensagem("Login bem-sucedido")
      // }

      //  console.log("Login bem-sucedido", data)
    } catch (error) {
      console.log("Erro ao conectar com o servidor:", error);
    }
  }
  return (
    <div className="container">
      <div className="login">
        <div className="header">
          <h1 className="title">Login</h1>
          {mensagem && <p className="error">{mensagem}</p>}
          <p className="login-info">
            Entre com seu email e senha para acessar sua conta
          </p>
        </div>
        <p></p>
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
          <p>
            Não tem uma conta ? <AnchorButton name="Cadastre-se" />
          </p>
        </form>
      </div>
    </div>
  );
}
