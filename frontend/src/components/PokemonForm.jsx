import { useState } from "react";
import { pokemonApi } from "../api/client";

const TIPOS_DISPONIBLES = [
  "Planta", "Fuego", "Agua", "Electrico", "Veneno", "Normal",
  "Hielo", "Lucha", "Tierra", "Volador", "Psiquico", "Bicho",
  "Roca", "Fantasma", "Dragon", "Siniestro", "Acero", "Hada"
];

const VACIO = {
  numero_pokedex: "",
  nombre: "",
  tipo_primario: "Planta",
  tipo_secundario: "",
  descripcion: "",
  activo: true,
};

export default function PokemonForm({ pokemon, onGuardado, onCancelar }) {
  const [form, setForm] = useState(() => {
    if (pokemon) {
      return {
        ...pokemon,
        tipo_secundario: pokemon.tipo_secundario || "",
      };
    }
    return VACIO;
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErrores({});

    const payload = {
      ...form,
      numero_pokedex: Number(form.numero_pokedex),
      tipo_secundario: form.tipo_secundario ? form.tipo_secundario : null,
    };

    try {
      if (pokemon) {
        await pokemonApi.actualizar(pokemon.id, payload);
      } else {
        await pokemonApi.crear(payload);
      }
      setForm(VACIO);
      onGuardado();
    } catch (err) {
      if (err.status === 400 && err.detalle) {
        setErrores(err.detalle);
      } else {
        setErrores({ general: ["No se pudo guardar. Intenta nuevamente."] });
      }
    } finally {
      setEnviando(false);
    }
  };

  const mensajes = (campo) =>
    errores[campo]?.map((m) => (
      <span key={m} style={{ color: "#ff6b6b", fontSize: "0.85rem", marginTop: "2px", display: "block" }}>
        {m}
      </span>
    ));

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#2a2a2a",
        padding: "1.5rem",
        borderRadius: "12px",
        marginBottom: "2.5rem",
        display: "grid",
        gap: "1rem",
        border: "1px solid #444",
        width: "100%",
        maxWidth: "600px",
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ color: "#fff", margin: 0, fontSize: "1.3rem" }}>
        {pokemon ? "Editar Pokémon" : "Añadir Nuevo Pokémon"}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
        <label style={{ display: "grid", color: "#ddd", fontSize: "0.9rem" }}>
          N° Pokédex
          <input
            name="numero_pokedex"
            type="number"
            value={form.numero_pokedex}
            onChange={handleChange}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #666", marginTop: "4px" }}
          />
          {mensajes("numero_pokedex")}
        </label>

        <label style={{ display: "grid", color: "#ddd", fontSize: "0.9rem" }}>
          Nombre
          <input
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #666", marginTop: "4px" }}
          />
          {mensajes("nombre")}
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <label style={{ display: "grid", color: "#ddd", fontSize: "0.9rem" }}>
          Tipo Primario
          <select
            name="tipo_primario"
            value={form.tipo_primario}
            onChange={handleChange}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #666", marginTop: "4px" }}
          >
            {TIPOS_DISPONIBLES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {mensajes("tipo_primario")}
        </label>

        <label style={{ display: "grid", color: "#ddd", fontSize: "0.9rem" }}>
          Tipo Secundario (Opcional)
          <select
            name="tipo_secundario"
            value={form.tipo_secundario}
            onChange={handleChange}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #666", marginTop: "4px" }}
          >
            <option value="">Ninguno</option>
            {TIPOS_DISPONIBLES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {mensajes("tipo_secundario")}
        </label>
      </div>

      <label style={{ display: "grid", color: "#ddd", fontSize: "0.9rem" }}>
        Descripción
        <textarea
          name="descripcion"
          rows="3"
          value={form.descripcion}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #666", marginTop: "4px" }}
        />
        {mensajes("descripcion")}
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ddd" }}>
        <input
          name="activo"
          type="checkbox"
          checked={form.activo}
          onChange={handleChange}
        />
        Visible en catálogo
      </label>

      {mensajes("general")}

      <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
        <button
          type="submit"
          disabled={enviando}
          style={{
            backgroundColor: "#e3350d",
            color: "white",
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {enviando ? "Guardando..." : "Guardar Pokémon"}
        </button>
        {pokemon && (
          <button
            type="button"
            onClick={onCancelar}
            style={{
              backgroundColor: "#555",
              color: "white",
              padding: "10px 18px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}