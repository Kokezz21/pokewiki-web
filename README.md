# PokéWiki Web

> Enciclopedia interactiva de Pokémon full-stack orientada a la consulta eficiente de datos y mecánicas.

## 1. Descripción del proyecto
- **Problema o necesidad**: Los entusiastas y analistas del mundo Pokémon requieren una interfaz rápida, limpia y libre de anuncios para explorar especies, tipos elementales y descripciones canónicas sin recurrir a plataformas sobrecargadas.
- **Usuarios objetivo**: Entrenadores, desarrolladores y fanáticos de Pokémon que buscan consultar información verificada y clasificada.
- **Funcionalidades previstas**: CRUD completo con Django REST Framework, autenticación con tokens JWT, gestión de favoritos por usuario y filtros avanzados por tipo.
- **Funcionalidades ya implementadas**: Modelo de base de datos relacional para Pokémon, panel administrativo personalizado con filtros y búsqueda, endpoints JSON (`/api/pokemon/` con búsqueda y detalle con manejo 404), e interfaz de usuario en React consumiendo la API mediante proxy reverso de Vite.

## 2. Equipo
| Integrante | Rol | Usuario GitHub |
|---|---|---|
| Jorge | Backend / Frontend / Documentación | @Kokezz21 |

## 3. Stack y versiones
| Tecnología | Versión |
|---|---|
| Python | 3.14 / 3.12+ |
| Django | 5.x |
| Node.js / npm | Versión LTS |
| React / Vite | React 19 / Vite 6 |
| Base de datos | SQLite |

## 4. Arquitectura
**Flujo de la petición**:
`Navegador (Cliente)` ➔ `React (Vite, http://localhost:5173)` ➔ `Proxy (/api/...)` ➔ `Django (http://localhost:8000)` ➔ `urls.py ➔ views.py ➔ ORM de Django` ➔ `SQLite (db.sqlite3)` ➔ `Respuesta JSON hacia React`.

**Estrategia elegida**: Arquitectura desacoplada (Single Page Application independiente consumiendo API REST).
*Justificación*: Permite separar totalmente el ciclo de vida del cliente del servidor, habilita la reutilización de la API para futuras aplicaciones móviles y aprovecha el Hot Module Replacement (HMR) ultrarrápido de Vite en desarrollo sin sobrecargar Django.

## 5. Estructura del repositorio
```text
pokewiki-web/
├── .gitignore
├── README.md
├── docs/
│   └── img/
│       ├── admin_pokemon.png
│       ├── api_response.png
│       └── react_app.png
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── catalogo/
│       ├── models.py
│       ├── views.py
│       ├── urls.py
│       ├── admin.py
│       └── migrations/
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── App.css
        └── main.jsx