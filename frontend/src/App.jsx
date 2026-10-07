import { useEffect, useState } from "react";
import { pokemonApi } from "./api/client";
import PokemonList from "./components/PokemonList";
import PokemonForm from "./components/PokemonForm";
import "./App.css";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelado = false;

    pokemonApi
      .listar()
      .then((datos) => {
        if (!cancelado) {
          setPokemons(Array.isArray(datos) ? datos : datos.results || []);
          setCargando(false);
        }
      })
      .catch(() => {
        if (!cancelado) {
          setError("No se pudo cargar la lista. ¿Está encendido el servidor Django?");
          setCargando(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [version]);

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
    } catch {
      setError("No se pudo eliminar el Pokémon.");
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
      {error && <p style={{ color: "#ff6b6b", background: "#3a1d1d", padding: "10px", borderRadius: "8px" }}>{error}</p>}

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
