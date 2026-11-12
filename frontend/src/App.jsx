import { useEffect, useState } from "react";
import { pokemonApi } from "./api/client";
import PokemonList from "./components/PokemonList";
import PokemonForm from "./components/PokemonForm";
import LoginForm from "./components/LoginForm";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(null);
  const [version, setVersion] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setPokemons([]);
    setEditando(null);
  };

  useEffect(() => {
    if (!token) return;
    let cancelado = false;

    pokemonApi
      .listar()
      .then((datos) => {
        if (!cancelado) {
          setPokemons(Array.isArray(datos) ? datos : datos.results || []);
          setCargando(false);
        }
      })
      .catch((err) => {
        if (!cancelado) {
          if (err.status === 401 || err.status === 403) {
            handleLogout();
          } else {
            setError("No se pudo cargar la lista. ¿Está encendido el servidor Django?");
          }
          setCargando(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [version, token]);

  // Si no hay sesión iniciada, mostrar pantalla de Login
  if (!token) {
    return (
      <div style={{ padding: "1rem" }}>
        <LoginForm
          onLoginSuccess={(nuevoToken) => {
            setError(null);
            setCargando(true);
            setToken(nuevoToken);
          }}
        />
      </div>
    );
  }

  const recargar = () => {
    setError(null);
    setCargando(true);
    setVersion((v) => v + 1);
  };

  const handleGuardado = () => {
    setEditando(null);
    recargar();
  };

  const handleEliminar = async (pokemon) => {
    if (!window.confirm(`¿Estás seguro de eliminar a ${pokemon.nombre}?`)) return;
    try {
      await pokemonApi.eliminar(pokemon.id);
      recargar();
    } catch (err) {
      if (err.status === 401) {
        handleLogout();
      } else if (err.status === 404) {
        setError("El Pokémon que intentas eliminar ya no existe (404).");
      } else {
        setError("No se pudo eliminar el Pokémon.");
      }
    }
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "2.5rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem"
      }}>
        <span style={{ color: "#aaa", fontSize: "0.9rem" }}>
          Conectado como <strong>{localStorage.getItem("username") || "Usuario"}</strong>
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: "#333",
            color: "#fff",
            border: "1px solid #555",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.85rem"
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#e3350d", fontSize: "2.5rem", margin: 0 }}>PokéWiki Web</h1>
        <p style={{ color: "#888", marginTop: "0.4rem" }}>
          Integración Full-Stack: Django REST Framework + React
        </p>
      </header>

      <PokemonForm
        key={editando ? editando.id : "nuevo"}
        pokemon={editando}
        onGuardado={handleGuardado}
        onCancelar={() => setEditando(null)}
      />

      {cargando && <p style={{ color: "#fff" }}>Cargando catálogo de Pokémon...</p>}
      {error && (
        <p style={{ color: "#ff6b6b", background: "#3a1d1d", padding: "10px 16px", borderRadius: "8px" }}>
          {error}
        </p>
      )}

      {!cargando && !error && (
        <PokemonList
          pokemons={pokemons}
          onEditar={setEditando}
          onEliminar={handleEliminar}
        />
      )}
    </div>
  );
}