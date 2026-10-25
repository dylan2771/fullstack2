# ⚡ BuildMyPC - Configurador de Hardware & Calculadora Energética

Plataforma web desarrollada en **React** que permite a los usuarios seleccionar componentes de hardware de alto rendimiento, consultar el catálogo disponible y calcular en tiempo real el consumo energético total (Watts), la fuente de poder recomendada y el desglose de precios con IVA.



> 🌐 **Demo en vivo desplegada en Vercel:** [https://fullstack2026-uh7v.vercel.app/](https://fullstack2026-uh7v.vercel.app/)

---

## 👥 Integrantes del Equipo
* **Joaquín Ferrada**
* **Maximiliano Veas**
* **Dylan Navarrete**

---

## 🚀 Tecnologías Utilizadas
* **Frontend**: React 18, Vite
* **Estilos**: Bootstrap 5, Custom CSS (Tema Dark `#0B0F19` / `#00FF66`)
* **Testing Unitario**: Vitest
* **Control de Versiones**: Git & GitHub

---

## 🛠️ Estructura del Proyecto

```text
src/
├── components/          # Componentes de interfaz (UI)
│   ├── basicos/         # Footer, Navbar
│   ├── estado/          # CalculadoraWatts (Armador Interactivo)
│   └── props/           # ListaProductos, TarjetaProducto
├── logica/              # Módulos de lógica de negocio pura
│   ├── armador.js       # Suma de watts y cálculo de fuente recomendada
│   ├── datos.js         # Inventario y catálogo de componentes
│   ├── formato.js       # Formateo CLP y cálculo de IVA
│   └── *.spec.js        # Cobertura de pruebas unitarias
├── pages/               # Vistas principales (Inicio, Catalogo, Armador)
└── App.jsx              # Enrutamiento y estructura global