const TIPO_COLORES = {
  Fuego: "#F08030",
  Agua: "#6890F0",
  Planta: "#78C850",
  Veneno: "#A040A0",
  Electrico: "#F8D030",
  Normal: "#A8A878",
  Hielo: "#98D8D8",
  Lucha: "#C03028",
  Tierra: "#E0C068",
  Volador: "#A890F0",
  Psiquico: "#F85888",
  Bicho: "#A8B820",
  Roca: "#B8A038",
  Fantasma: "#705898",
  Dragon: "#7038F8",
  Siniestro: "#705848",
  Acero: "#B8B8D0",
  Hada: "#EE99AC",
};

const obtenerColor = (tipo) => TIPO_COLORES[tipo] || "#777";

export default function PokemonList({ pokemons, onEditar, onEliminar }) {
  if (pokemons.length === 0) {
    return <p style={{ color: "#aaa" }}>Aún no hay Pokémon registrados en la base de datos.</p>;
  }

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "2rem",
      justifyContent: "center",
      width: "100%"
    }}>
      {pokemons.map((p) => (
        <div
          key={p.id}
          style={{
            flex: "0 1 280px",
            border: "1px solid #e0e0e0",
            borderRadius: "16px",
            padding: "1.8rem 1.2rem",
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            color: "#333",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: "0.85rem", color: "#888", fontWeight: "bold" }}>
            #{String(p.numero_pokedex).padStart(3, "0")}
          </span>
          <h2 style={{ margin: "0.4rem 0", fontSize: "1.4rem", color: "#1a1a1a" }}>
            {p.nombre}
          </h2>

          <div style={{ margin: "0.6rem 0 1rem 0", display: "flex", gap: "8px", justifyContent: "center" }}>
            <span style={{
              backgroundColor: obtenerColor(p.tipo_primario),
              color: "white",
              padding: "4px 14px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
            }}>
              {p.tipo_primario}
            </span>
            {p.tipo_secundario && (
              <span style={{
                backgroundColor: obtenerColor(p.tipo_secundario),
                color: "white",
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
              }}>
                {p.tipo_secundario}
              </span>
            )}
          </div>

          <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.5", margin: "0 0 1.2rem 0" }}>
            {p.descripcion}
          </p>

          <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
            <button
              onClick={() => onEditar(p)}
              style={{
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                padding: "6px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(p)}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "6px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}