const BASE = "/api";

async function request(ruta, opciones = {}) {
  const { headers, ...resto } = opciones;
  const respuesta = await fetch(BASE + ruta, {
    ...resto,
    headers: { "Content-Type": "application/json", ...headers },
  });

  if (!respuesta.ok) {
    let detalle = null;
    try {
      detalle = await respuesta.json();
    } catch {
      // No contiene JSON
    }
    const error = new Error("Error " + respuesta.status);
    error.status = respuesta.status;
    error.detalle = detalle;
    throw error;
  }

  if (respuesta.status === 204) return null;
  return respuesta.json();
}

export const pokemonApi = {
  listar: () => request("/pokemon/"),
  crear: (datos) => request("/pokemon/", { method: "POST", body: JSON.stringify(datos) }),
  actualizar: (id, datos) => request(`/pokemon/${id}/`, { method: "PUT", body: JSON.stringify(datos) }),
  eliminar: (id) => request(`/pokemon/${id}/`, { method: "DELETE" }),
};