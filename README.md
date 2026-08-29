# Tecno Nova — Backend API

Backend del proyecto formativo Tecno Nova, una plataforma de e-commerce y soporte postventa para productos tecnológicos.

## Tecnologías
- Node.js + Express
- MySQL + MySQL2
- bcrypt (cifrado de contraseñas)
- dotenv

## Instalación
1. Clonar el repositorio
2. `npm install`
3. Crear un archivo `.env` con las variables DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, PORT
4. Crear la base de datos `tecno_nova` con la tabla Cliente
5. `npm run dev`

## Estructura del proyecto
Arquitectura por capas: config, middleware, modules (cada módulo con controller, service, repository, validator, routes).

## Endpoints — Módulo Cliente
| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/clientes | Listar clientes activos |
| GET | /api/clientes/:id | Consultar un cliente |
| POST | /api/clientes | Crear cliente |
| PUT | /api/clientes/:id | Actualizar datos generales |
| PATCH | /api/clientes/:id/status | Activar/inactivar |
| DELETE | /api/clientes/:id | Eliminación lógica |

## Autores
Jessica Joana Recalde Portilla y Jair Llantén Martínez — SENA ADSO, ficha 3235887

```markdown
# Tecno Nova — Backend API

Backend del proyecto formativo Tecno Nova, una plataforma de e-commerce y soporte postventa para productos tecnológicos.

## Tecnologías
- Node.js + Express
- MySQL + MySQL2
- bcrypt (cifrado de contraseñas)
- dotenv

## Instalación
1. Clonar el repositorio
2. `npm install`
3. Crear un archivo `.env` con las variables DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, PORT
4. Crear la base de datos `tecno_nova` con la tabla Cliente
5. `npm run dev`

## Estructura del proyecto
Arquitectura por capas: config, middleware, modules (cada módulo con controller, service, repository, validator, routes).

## Endpoints — Módulo Cliente
| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/clientes | Listar clientes activos |
| GET | /api/clientes/:id | Consultar un cliente |
| POST | /api/clientes | Crear cliente |
| PUT | /api/clientes/:id | Actualizar datos generales |
| PATCH | /api/clientes/:id/status | Activar/inactivar |
| DELETE | /api/clientes/:id | Eliminación lógica |

## Autores
Jessica Joana Recalde Portilla y Jair Llantén Martínez — SENA ADSO, ficha 3235887 ```