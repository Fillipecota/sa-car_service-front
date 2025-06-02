
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.css";
import { TextField, Button } from "@mui/material";

export default function Login() {

  const router = useRouter();
  // const para set senha password e erros
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const disabledButton = !email || password.length === 0;
  // const para verificar senha 
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // impede reload do formulário
    if (email === "adm" && password === "123") {
      // ajuste para a rota pós‑login
      router.push("/dashboard");
    } else {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        {/* Tornamos o formulário responsável pelo Enter */}
        <form className={styles.form} onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            size="small"
            margin="normal"
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            size="small"
            margin="normal"
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit" // botão passa a ser "submit"
            style={{ marginTop: "16px" }}
            onClick={handleLogin} disabled={disabledButton}
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
