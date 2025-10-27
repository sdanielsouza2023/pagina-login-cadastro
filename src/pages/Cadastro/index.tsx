import "./styles.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { AnchorButton } from "../../components/AnchorButton";
import { useState } from "react";

export default function Cadastro() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erros, setErros] = useState<{
    nomeCompleto?: string;
    email?: string;
    confirmarEmail?: string;
    senha?: string;
    confirmarSenha?: string;
  }>({});

  // NOVO: Estado para gerenciar mensagens com tipo (sucesso ou erro)
  const [statusMensagem, setStatusMensagem] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({ text: "", type: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMensagem({ text: "", type: "" }); // Limpa a mensagem ao submeter

    const novosErros: typeof erros = {};

    // Validação Nome
    if (!nomeCompleto.trim() || nomeCompleto.length < 5) {
      novosErros.nomeCompleto =
        "O nome completo é obrigatório e deve ter pelo menos 5 caracteres";
    }

    // Validação Email
    if (!emailRegex.test(email)) {
      novosErros.email = "Formato de email inválido";
    }
    if (email !== confirmarEmail) {
      novosErros.confirmarEmail = "Emails não coincidem";
    }

    // Validação Senha
    if (!passwordRegex.test(senha)) {
      novosErros.senha =
        "A senha deve ter no mínimo 8 caracteres, conter pelo menos uma letra e um número"; // Mensagem mais clara
    }
    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = "Senhas não coincidem";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: nomeCompleto, email, password: senha }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Erro retornado pelo backend (400, 409, 500)
          setStatusMensagem({
            text: data.message || "Erro desconhecido ao cadastrar",
            type: "error",
          });
          return;
        }

        // Sucesso
        setStatusMensagem({
          text: "Cadastro realizado com sucesso!",
          type: "success",
        });

        // Limpar formulário após sucesso
        setNomeCompleto("");
        setEmail("");
        setConfirmarEmail("");
        setSenha("");
        setConfirmarSenha("");
        setErros({});
      } catch (error) {
        // Erro de conexão (ex: servidor offline)
        console.error("Erro ao conectar com o servidor:", error);
        setStatusMensagem({
          text: "Erro ao conectar com o servidor",
          type: "error",
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="login">
        <div className="header">
          <h1 className="title">Cadastro</h1>
          {/* RENDERIZAÇÃO MELHORADA PARA SUCESSO OU ERRO */}
          {statusMensagem.text && (
            <p
              style={{
                color: statusMensagem.type === "error" ? "red" : "green",
              }}
            >
              {statusMensagem.text}
            </p>
          )}
          <p className="login-info">
            Entre com as informações para continuar o cadastro
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome Completo"
            name="nome-completo"
            type="text"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
          {erros.nomeCompleto && (
            <p style={{ color: "red" }}>{erros.nomeCompleto}</p>
          )}

          <Input
            label="E-mail"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {erros.email && <p style={{ color: "red" }}>{erros.email}</p>}

          <Input
            label="Confirmar Email"
            name="confirmar-email"
            type="email"
            value={confirmarEmail}
            onChange={(e) => setConfirmarEmail(e.target.value)}
          />
          {erros.confirmarEmail && (
            <p style={{ color: "red" }}>{erros.confirmarEmail}</p>
          )}

          <Input
            label="Senha"
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {erros.senha && <p style={{ color: "red" }}>{erros.senha}</p>}

          <Input
            label="Confirmar Senha"
            name="confirmar-senha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          {erros.confirmarSenha && (
            <p style={{ color: "red" }}>{erros.confirmarSenha}</p>
          )}

          <Button label="Confirmar Cadastro" type="submit" />

          <p>
            Já tem uma conta? <AnchorButton name="Login" />
          </p>
        </form>
      </div>
    </div>
  );
}
