<p align="center" style="margin-top: 50px">
  <img src="resources/portada.jpg" alt="Jump2Digital" width="500">
</p>

<h1 align="center">Skins API</h1>
<h3 align="center">Jump2Digital Hackathon</h3>

<p align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white">
  </a>
    <a href="#">
    <img src="https://img.shields.io/badge/Docker-%232496ED.svg?&style=for-the-badge&logo=docker&logoColor=white">
  </a>
  </a>
    <a href="#">
<img src="https://img.shields.io/badge/Cypress-04C38E.svg?&style=for-the-badge&logo=cypress&logoColor=white">
  </a>

</p>
<p align="center">
API de Skins para Jump2Digital. Desarrollada con Node.js y TypeScript, y contenerizada con Docker para una implementación sencilla y eficiente.
</p>

<br>

## Instrucciones de Despliegue
Para desplegar la API, asegúrate de tener Docker y Docker Compose instalados en tu sistema. Una vez instalados, puedes clonar el repositorio y construir el proyecto con el siguiente comando:
```bash
docker-compose up --build
```

<br>
El proyecto se desplegará en el puerto 3000 de tu máquina local, y ya podrás hacer peticiones (asegúrate de incluir los parámetros necesarios en el cuerpo de la petición, y el bearer token en caso de que sea necesario).


## Testing

Se ha usado Cypress para realizar tests de la API y comprobar su correcto funcionamiento.

Todos los tests se encuentran en `cypress/api_spec.cy.ts` y se ejecutan automaticamente al construir el proyecto con Docker Compose.


## Modelo de Skin
Cada Skin está representada por una estructura de datos que incluye:

- [x] id: Identificador único de la skin.
- [x] nombre: Nombre de la skin.
- [x] tipo[]: Tipos o categorías de la skin.
- [x] precio: Precio de la skin.
- [x] color: Color principal de la skin.


## Autenticación y Seguridad

La API utiliza JWT (JSON Web Tokens) para manejar la autenticación de los usuarios. Los tokens son requeridos para todas las operaciones relacionadas con las skins.

El registro y el inicio de sesión no requieren un token previo, y van a devolver un token si la autenticación es válida.

Las entradas de los usuarios son validadas en todos los endpoints para asegurar que los datos sean correctos y estén sanitizados. Esto incluye la comprobación de campos requeridos, la longitud del texto y otros criterios específicos para cada entrada.


## Base de Datos

La API está configurada para interactuar con una base de datos MongoDB, donde se almacenan todos los datos de las skins, los usuarios y las transacciones de los usuarios.

Docker Compose se encarga de crear un contenedor de MongoDB y vincularlo con el contenedor de la API. La base de datos se inicializa con datos de prueba al construir el proyecto (del fichero `db.json`).

Al desplegar la API, se crea un usuario de prueba (`mongo-init.js`):
```json
{
  "url": "mongodb://localhost:27017/j2d-skins-api",
  "username": "admin",
  "password": "admin"
}
```

## API Endpoints

La API proporciona los siguientes endpoints para la gestión de skins:

### Autenticación
* **POST /register:** Registra un nuevo usuario.
 
| Campo       | Tipo     | Descripción                         | Requerido |
|-------------|----------|-------------------------------------|-----------|
| `username`  | `string` | Nombre de usuario, 3-30 caracteres. | Sí        |
| `password`  | `string` | Contraseña, 6-20 caracteres.        | Sí        |
 
<br>

* **POST /login:** Autentica a un usuario existente.

| Campo       | Tipo     | Descripción                         | Requerido |
|-------------|----------|-------------------------------------|-----------|
| `username`  | `string` | Nombre de usuario, 3-30 caracteres. | Sí        |
| `password`  | `string` | Contraseña, 6-20 caracteres.        | Sí        |

<br>

Las dos rutas de autenticación devuelven un token JWT que debe ser incluido en el encabezado de las peticiones a los endpoints siguientes (bearer token).


### Skins
* **GET /available:** Lista todas las skins disponibles para compra. Requiere autenticación JWT.
 
<br>

* **POST /buy:** Permite a los usuarios comprar una skin y almacenarla en la base de datos. Requiere autenticación JWT y el skinId en el cuerpo de la petición.

| Campo    | Tipo     | Descripción                         | Requerido |
|----------|----------|-------------------------------------|-----------|
| `skinId` | `string` | Id de la Skin que se quiere comprar | Sí        |


<br>

* **GET /myskins:** Lista todas las skins compradas por el usuario autenticado.

<br>

* **PUT /color:** Permite a los usuarios cambiar el color de una skin que ya han comprado. Requiere autenticación JWT y userSkinId y newColor en el cuerpo de la petición.

| Campo        | Tipo     | Descripción                                  | Requerido |
|--------------|----------|----------------------------------------------|-----------|
| `userSkinId` | `string` | Id de la skin que se quiere cambiar de color | Sí        |
| `newColor`   | `string` | Nuevo color de la skin                       | Sí        |

<br>

* **DELETE /delete/{id}:** Permite a los usuarios eliminar una skin comprada. Requiere autenticación JWT y id de la skin como parámetro de ruta.

<br>

* **GET /getskin/{id}:** Devuelve la información de una skin específica. Requiere autenticación JWT y id de la skin como parámetro de ruta.



## Autor
Biel Carpi ([biel.carpi@outlook.com](mailto:biel.carpi@outlook.com))

## Licencia
Este proyecto está bajo la Licencia BSD 3-Clause, que permite la redistribución y uso con o sin modificación, siempre y cuando se reconozca la autoría del proyecto.

Para más información, revisa la [LICENSE](https://github.com/bielcarpi/j2d-skins-api/blob/main/LICENSE) 