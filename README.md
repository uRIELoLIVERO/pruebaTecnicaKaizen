# Task Management Application

## Descripción
Esta es una aplicación web de gestión de tareas que permite a los usuarios registrarse, iniciar sesión y gestionar sus tareas (crear, leer, actualizar y eliminar). La aplicación implementa un sistema de autenticación y autorización utilizando JWT (JSON Web Token) para garantizar la seguridad de los datos. El frontend está desarrollado con React y utiliza Material UI para la interfaz, mientras que el backend está construido con Node.js, Express y Sequelize, conectado a una base de datos MySQL.

## Características
- Registro de usuarios
- Inicio de sesión de usuarios
- Cierre de sesión
- Gestión de tareas (crear, leer, actualizar y eliminar)
- Autenticación y autorización con JWT
- Encriptación de contraseñas

## Tecnologías Utilizadas
### Frontend:
- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **Material UI**: Biblioteca de componentes para un diseño visual atractivo y funcional.
- **JWT**: Para la autenticación y autorización de usuarios.

### Backend:
- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework web minimalista para Node.js.
- **Sequelize**: ORM para la interacción con la base de datos MySQL.
- **MySQL**: Sistema de gestión de bases de datos relacional.

## Requisitos
- **Node.js**: v14 o superior
- **MySQL**: v8.0 o superior
- **npm**: v6 o superior

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/uRIELoLIVERO/pruebaTecnicaKaizen.git
   cd pruebaTecnicaKaizen
   ```
2. Instalar dependencias tanto en el frontend como en el backend:

    ```bash
    cd ./node
    npm install
    cd ../TasklistWUsers
    npm install
    ```


3. Configurar variables de entorno: Crea un archivo .env en el backend, en la carpeta node con las siguientes variables:

    ```bash
    PORT = 4000
    MYSQL_HOST = localhost
    MYSQL_USER = root
    MYSQL_PASSWORD =
    MYSQL_DB = example
    ```

4. Crear y configurar la base de datos: En tu instancia de MySQL, ejecuta los siguientes comandos para crear la base de datos:

    ```sql
    CREATE DATABASE example;
    ```

5. Ejecutar las migraciones de Sequelize:

    ```bash
    # En la carpeta node
    sequelize-cli db:migrate
    ```

6. Poblar la base de datos con datos iniciales:
    ```bash
    # En la carpeta node
    npm run seed
    ```
    Este comando ejecutará el script seedDatabase.js, que creará roles predefinidos, un usuario administrador, un usuario estándar y algunas tareas de ejemplo.
7. Iniciar el servidor:

    ```bash
    # En la raíz del proyecto
    cd ./node
    npm run dev
    ```

8. Iniciar el cliente:

    ```bash
    cd ../TasklistWUsers
    npm run dev
    ```

## Uso

1. Acceder a la aplicación desde tu navegador en http://localhost:5173.
2. Registrar un nuevo usuario desde la página de registro.
3. Iniciar sesión con el usuario registrado o con alguno de los usuarios predefinidos:
    Administrador:
    Usuario: admin@example.com
    Contraseña: admin123
    
    Usuario estándar:
    Usuario: usuario@example.com
    Contraseña: user123..
4. Crear, editar o eliminar tareas desde la página de gestión de tareas.

## Estructura de Roles y Permisos
La aplicación utiliza un sistema de roles y permisos para gestionar el acceso a diferentes funcionalidades:

**Rol de Administrador**: Tiene acceso completo a todas las funcionalidades de la aplicación, incluyendo la gestión de usuarios.
**Rol de Usuario**: Puede crear, leer, actualizar y eliminar sus propias tareas.

Los permisos se gestionan a través de un middleware de autorización que verifica los permisos del usuario antes de permitir el acceso a ciertas rutas o funcionalidades.

## Datos Iniciales
Al ejecutar el script de población (npm run seed), se crean los siguientes datos iniciales:

**Roles:**
Administrador
Usuario estándar


**Usuarios:**
Un usuario administrador
Un usuario estándar de prueba

**Tareas:**
Dos tareas de ejemplo, una para cada usuario creado

## Rutas de la API
#### Usuarios
**POST** /api/users/register: _Registra un nuevo usuario._
**POST** /api/users/login: _Inicia sesión y devuelve un token JWT._
#### Tareas
**GET** /api/tasks/my-tasks: _Obtiene las tareas del usuario autenticado._
**POST** /api/tasks: _Crea una nueva tarea._
**PUT** /api/tasks/update: _Actualiza una tarea existente._
**PUT** /api/tasks: _Elimina lógicamente una tarea._

## Esquema de la Base de Datos
#### Tabla _users_

|Campo|Tipo|Descripción|
| ------ | ------ | ------ |
|id	|INTEGER|Identificador único (PK)
|username|VARCHAR|Nombre de usuario
|email|VARCHAR|Correo electrónico
|password|VARCHAR|Contraseña encriptada
|created_at|TIMESTAP|fecha y hora de creacion
|updatet_at|TIMESTAP|fecha y hora de ultima acutalizacion
|is_deleted|BOOLEAN|eliminacion logica
|role_id|INTEGER|Identificador del rol (FK)

#### Tabla _tasks_
|Campo|Tipo|Descripción|
| ------ | ------ | ------ |
|id|INTEGER|Identificador único (PK)
|title|VARCHAR|Título de la tarea
|description|TEXT|Descripción de la tarea (sin uso)
|status|BOOLEAN|Estado de la tarea (pendiente/completada)
|userId|INTEGER|Identificador del usuario (FK)
|created_at|TIMESTAP|fecha y hora de creacion
|updatet_at|TIMESTAP|fecha y hora de ultima acutalizacion
|is_deleted|BOOLEAN|eliminacion logica

#### Tabla _roles_
|Campo|Tipo|Descripción|
| ------ | ------ | ------ |
|id|INTEGER|Identificador único (PK)
|name|VARCHAR|Nombre del rol
|description|TEXT|Descripción acerca de lo que tiene permitido el rol
|permissions|LONGTEXT|Array de string con los nombres de los permisos
|created_at|TIMESTAP|fecha y hora de creacion
|updatet_at|TIMESTAP|fecha y hora de ultima acutalizacion

## Buenas Prácticas y Seguridad
Las contraseñas se almacenan encriptadas utilizando bcrypt.
JWT se utiliza para proteger las rutas de la API.

## Documentación
Para más detalles sobre la estructura del proyecto, consulta el código fuente y los comentarios.
