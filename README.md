# ⚡ BuildMyPC — Plataforma Fullstack de Configuración de Hardware

Aplicación web desarrollada como Evaluación Parcial N° 3 para la asignatura **DSY1104 • Desarrollo Fullstack II** en **Duoc UC** (Sede Valparaíso). El sistema implementa una arquitectura de microservicios desacoplados en Spring Boot con descubrimiento dinámico (Eureka), API Gateway, autenticación JWT basada en roles y un frontend moderno en React 18.

---

## 👥 Equipo de Desarrollo
* **Joaquín Ferrada**
* **Maximiliano Veas**
* **Dylan Navarrete**

---

## 🏛️ Arquitectura del Sistema (Microservicios)

El proyecto está compuesto por un ecosistema de microservicios orquestados mediante Spring Cloud y Spring Boot:

| Microservicio / Módulo | Puerto | Descripción |
| :--- | :---: | :--- |
| **Eureka Server** | `8761` | Servidor de descubrimiento y registro dinámico de instancias. |
| **API Gateway** | `8080` | Punto de entrada único (Proxy), enrutamiento y gestión de CORS. |
| **User Service** | `8089` | Gestión de identidades, registro, roles (`ADMIN`, `CLIENTE`) y autenticación JWT. |
| **Component Service** | `8081` | Administración del catálogo general de hardware. |
| **CPU Service** | `8082` | Microservicio especializado en procesadores. |
| **RAM Service** | `8083` | Microservicio especializado en memorias RAM. |
| **Motherboard Service** | `8084` | Microservicio especializado en placas madre. |
| **GPU Service** | `8085` | Microservicio especializado en tarjetas gráficas. |
| **Storage Service** | `8086` | Microservicio especializado en almacenamiento (SSD/HDD). |
| **PSU Service** | `8087` | Microservicio especializado en fuentes de poder. |
| **Builder Service** | `8088` | Lógica de negocio del armador de PC y gestión de cotizaciones. |
| **Frontend (React)** | `5173` | Interfaz de usuario construida con React 18, Vite y Bootstrap 5. |

---

## 🔒 Seguridad y Autenticación JWT
* **Stateless:** Arquitectura sin estado utilizando tokens JWT firmados criptográficamente (HS256).
* **Control de Roles:** Segregación estricta de permisos entre lectura pública del catálogo y escritura protegida (`ADMIN` / `CLIENTE`) mediante Spring Security y `JwtAuthenticationConverter`.
* **Persistencia de Sesión:** El frontend gestiona la sesión de forma segura en `localStorage` con validación automática del token y expiración de sesión.

---

## 🚀 Guía de Ejecución Local

### 1. Backend (Spring Boot en IntelliJ IDEA)
Para levantar la arquitectura correctamente, inicia los proyectos en el siguiente orden:
1. **Eureka Server** (`msvc-eureka` en puerto `8761`)
2. **API Gateway** (`msvc-gateway` en puerto `8080`)
3. **Microservicios de Negocio y Hardware** (`user-service`, `component-service`, `builder-service`, `cpu-service`, etc.)

Verifica que todos los servicios aparezcan en verde (`UP`) en el panel de Eureka: `http://localhost:8761`.

### 2. Frontend (React 18 + Vite)
Abre una terminal en la carpeta del frontend y ejecuta:
```bash
# Instalar dependencias
npm install

# Iniciar entorno de desarrollo
npm run dev