# ⚡ BuildMyPC - Configurador de Hardware & Calculadora Energética

Plataforma web desarrollada en **React** que permite a los usuarios seleccionar componentes de hardware de alto rendimiento, consultar el catálogo disponible y calcular en tiempo real el consumo energético total (Watts), la fuente de poder recomendada y el desglose de precios con IVA.

> 🌐 **Demo en vivo desplegada en Vercel:** [https://desarrollo-fullstack2.vercel.app/](https://desarrollo-fullstack2.vercel.app/)

---

## 🚀 Características Principales

* **🛒 Catálogo Dinámico de Productos**: Exploración de componentes de hardware (Procesadores, Tarjetas de Video, Memorias RAM, etc.) con stock disponible, imágenes y precios formateados en CLP.
* **🔧 Armador de PC & Calculadora de Watts**: Selección interactiva de componentes con cálculo automático de consumo eléctrico total y sugerencia de fuente de poder recomendada (+100W de margen de seguridad).
* **📦 Carrito de Compras Persistente**: Gestión de cantidades, vaciado e integración global mediante `localStorage` para conservar la selección al recargar la página.
* **🧾 Cálculo Financiero Formal**: Desglose automático de Subtotal Neto, IVA (19%) y Total Final en pesos chilenos ($CLP) modularizado en `formato.js`.
* **📑 Historial de Cotizaciones**: Almacenamiento local de presupuestos armados con la capacidad de recargarlos directamente al carrito de compras con un clic.
* **🔒 Checkout & Autenticación**: Redirección fluida desde la confirmación de compra hacia la vista de inicio de sesión (`Auth`).

---

## 🛠️ Tecnologías Utilizadas

* **Frontend**: React.js, JavaScript (ES6+)
* **Estilos & UI**: Bootstrap 5, CSS3 Custom Properties (Tema Dark/Neón)
* **Persistencia**: LocalStorage API
* **Despliegue**: Vercel

---

## ⚙️ Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/dylan2771/fullstack2.git](https://github.com/dylan2771/fullstack2.git)