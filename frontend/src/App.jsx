import { useState, useEffect } from 'react'
import './App.css'

// Mapa de colores oficiales para cada tipo elemental
const TIPO_COLORES = {
  Fuego: '#F08030',
  Agua: '#6890F0',
  Planta: '#78C850',
  Veneno: '#A040A0',
  Electrico: '#F8D030',
  Normal: '#A8A878',
  Hielo: '#98D8D8',
  Lucha: '#C03028',
  Tierra: '#E0C068',
  Volador: '#A890F0',
  Psiquico: '#F85888',
  Bicho: '#A8B820',
  Roca: '#B8A038',
  Fantasma: '#705898',
  Dragon: '#7038F8',
  Siniestro: '#705848',
  Acero: '#B8B8D0',
  Hada: '#EE99AC',
}

const obtenerColorTipo = (tipo) => {
  return TIPO_COLORES[tipo] || '#68A090'
}

function App() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/pokemon/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al conectar con la API de Django')
        }
        return res.json()
      })
      .then((data) => {
        setPokemons(data.results || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{
      width: '100%',
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '3rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: '#e3350d', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          PokéWiki Web
        </h1>
        <p style={{ color: '#aaa', fontSize: '1rem' }}>
          Integración Full-Stack: Django (Backend) + React (Frontend)
        </p>
      </header>

      {loading && <p style={{ color: '#fff', fontSize: '1.1rem' }}>Cargando catálogo de Pokémon...</p>}
      {error && <p style={{ color: '#ff6b6b', fontSize: '1.1rem' }}>Error: {error}</p>}

      {!loading && !error && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          width: '100%'
        }}>
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              style={{
                flex: '0 1 280px',
                border: '1px solid #e0e0e0',
                borderRadius: '16px',
                padding: '1.8rem 1.2rem',
                backgroundColor: '#ffffff',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                color: '#333',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: 'bold' }}>
                #{String(pokemon.numero_pokedex).padStart(3, '0')}
              </span>
              <h2 style={{ margin: '0.4rem 0', fontSize: '1.4rem', color: '#1a1a1a' }}>
                {pokemon.nombre}
              </h2>
              <div style={{
                margin: '0.6rem 0 1rem 0',
                display: 'flex',
                gap: '8px',
                justifyContent: 'center'
              }}>
                <span style={{
                  backgroundColor: obtenerColorTipo(pokemon.tipo_primario),
                  color: 'white',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                }}>
                  {pokemon.tipo_primario}
                </span>
                {pokemon.tipo_secundario && (
                  <span style={{
                    backgroundColor: obtenerColorTipo(pokemon.tipo_secundario),
                    color: 'white',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                  }}>
                    {pokemon.tipo_secundario}
                  </span>
                )}
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: '#555',
                lineHeight: '1.5',
                margin: 0
              }}>
                {pokemon.descripcion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App