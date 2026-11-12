import { useState } from "react";
import { pokemonApi } from "../api/client";

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const data = await pokemonApi.login({ username, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      onLoginSuccess(data.token);
    } catch (err) {
      if (err.status === 400 || err.status === 401) {
        setError("Usuario o contraseña incorrectos.");
      } else {
        setError("No se pudo conectar con el servidor Django.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      width: "100%",
      margin: "3rem auto",
      padding: "2rem",
      background: "#1e1e24",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h2 style={{ color: "#e3350d", textAlign: "center", marginTop: 0 }}>
        PokéWiki Login
      </h2>
      <p style={{ color: "#aaa", textAlign: "center", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
        Inicia sesión para gestionar el catálogo
      </p>

      {error && (
        <div style={{
          background: "#3a1d1d",
          color: "#ff6b6b",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "1rem",
          fontSize: "0.9rem",
          textAlign: "center"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.9rem", color: "#ccc" }}>
            Usuario
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Ej: admin"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #444",
              background: "#2a2a32",
              color: "#fff",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.9rem", color: "#ccc" }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #444",
              background: "#2a2a32",
              color: "#fff",
              boxSizing: "border-box"
            }}
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          style={{
            marginTop: "0.5rem",
            padding: "12px",
            background: cargando ? "#888" : "#e3350d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: cargando ? "not-allowed" : "pointer",
            fontSize: "1rem"
          }}
        >
          {cargando ? "Verificando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}