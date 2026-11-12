const BASE = "/api";

async function request(ruta, opciones = {}) {
  const { headers, ...resto } = opciones;
  
  // Obtener el token guardado si el usuario inició sesión
  const token = localStorage.getItem("token");
  const authHeader = token ? { Authorization: `Token ${token}` } : {};

  const respuesta = await fetch(BASE + ruta, {
    ...resto,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...headers,
    },
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
  login: (credenciales) =>
    request("/login/", { method: "POST", body: JSON.stringify(credenciales) }),
  listar: () => request("/pokemon/"),
  crear: (datos) =>
    request("/pokemon/", { method: "POST", body: JSON.stringify(datos) }),
  actualizar: (id, datos) =>
    request(`/pokemon/${id}/`, { method: "PUT", body: JSON.stringify(datos) }),
  eliminar: (id) => request(`/pokemon/${id}/`, { method: "DELETE" }),
};