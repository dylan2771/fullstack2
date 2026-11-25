// src/pages/Catalogo.jsx
import { useState, useEffect } from 'react';
import { componentesService } from '../services/componentes';
import { formatearCLP } from '../logica/formato';

const PRODUCTOS_CATALOGO = [
  // --- COMPONENTES PC (GPU, CPU, RAM, Placas Madre, Fuentes, Monitores) ---
  {
    id: "1",
    nombre: "Tarjeta de Video NVIDIA RTX 3060 12GB",
    precio: 329990,
    watts: 170,
    categoria: "GAMER",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    nombre: "Procesador AMD Ryzen 7 7800X3D",
    precio: 449990,
    watts: 120,
    categoria: "GAMER",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    nombre: "Tarjeta de Video NVIDIA RTX 4070 Super 12GB",
    precio: 699990,
    watts: 220,
    categoria: "GAMER",
    tipo: "componente",
    imagen: "https://www.hardwareluxx.de/images/cdn02/uploads/2023/Apr/timely_controller_gn/nvidia-geforce-rtx-4070-fe-00002_1920px.jpg"
  },
  {
    id: "21",
    nombre: "Placa Madre ASUS ROG Strix B650E-F Gaming WiFi AM5",
    precio: 279990,
    watts: 35,
    categoria: "GAMER",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "22",
    nombre: "Fuente de Poder Corsair RM850e 850W 80+ Gold Modular",
    precio: 139990,
    watts: 0,
    categoria: "GAMER",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    nombre: "Memoria RAM Corsair Vengeance DDR5 32GB (2x16GB)",
    precio: 129990,
    watts: 15,
    categoria: "GAMER",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    nombre: "Procesador Intel Core i9-14900K",
    precio: 629990,
    watts: 253,
    categoria: "WORKSTATION",
    tipo: "componente",
    imagen: "https://www.muycomputer.com/wp-content/uploads/2023/09/Intel-1.jpg"
  },
  {
    id: "5",
    nombre: "Tarjeta de Video NVIDIA RTX 4090 24GB",
    precio: 1899900,
    watts: 450,
    categoria: "WORKSTATION",
    tipo: "componente",
    imagen: "https://www.winpy.cl/files/36915-3331-ASUS-ROG-Strix-GeForce-RTX-4090-24G-1.jpg"
  },
  {
    id: "23",
    nombre: "Placa Madre ASUS ProArt Z790-Creator WiFi DDR5",
    precio: 469990,
    watts: 45,
    categoria: "WORKSTATION",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "24",
    nombre: "Fuente de Poder Seasonic PRIME TX-1000 1000W 80+ Titanium",
    precio: 289990,
    watts: 0,
    categoria: "WORKSTATION",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "10",
    nombre: "Memoria RAM Kingston FURY Renegade DDR5 64GB",
    precio: 249990,
    watts: 25,
    categoria: "WORKSTATION",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "11",
    nombre: "Monitor Profesional 32\" 4K UHD IPS HDR",
    precio: 499990,
    watts: 45,
    categoria: "WORKSTATION",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "7",
    nombre: "Memoria RAM Kingston FURY Beast DDR4 16GB",
    precio: 45990,
    watts: 10,
    categoria: "OFICINA",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "12",
    nombre: "Procesador Intel Core i5-12400F",
    precio: 139990,
    watts: 65,
    categoria: "OFICINA",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "25",
    nombre: "Placa Madre MSI PRO H610M-G DDR4 Micro-ATX",
    precio: 84990,
    watts: 25,
    categoria: "OFICINA",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "26",
    nombre: "Fuente de Poder EVGA 500 W1 500W 80+ White",
    precio: 44990,
    watts: 0,
    categoria: "OFICINA",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "14",
    nombre: "Monitor Oficina 24\" Full HD IPS",
    precio: 129990,
    watts: 20,
    categoria: "OFICINA",
    tipo: "componente",
    imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
  },

  // --- PERIFÉRICOS Y ACCESORIOS ---
  {
    id: "8",
    nombre: "Teclado Mecánico Gamer HyperX Alloy Origins RGB",
    precio: 89990,
    watts: 5,
    categoria: "GAMER",
    tipo: "periferico",
    imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "9",
    nombre: "Mouse Gamer Logitech G Pro X Superlight Wireless",
    precio: 119990,
    watts: 5,
    categoria: "GAMER",
    tipo: "periferico",
    imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "15",
    nombre: "Mouse Gamer Logitech G502 HERO High Performance",
    precio: 49990,
    watts: 5,
    categoria: "GAMER",
    tipo: "periferico",
    imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "16",
    nombre: "Mouse Pad Gamer XXL Extended RGB (90x40cm)",
    precio: 24990,
    watts: 3,
    categoria: "GAMER",
    tipo: "periferico",
    imagen: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "17",
    nombre: "Audífonos Gamer Logitech G Pro X 2 Lightspeed Wireless (Gama Alta)",
    precio: 229990,
    watts: 5,
    categoria: "GAMER",
    tipo: "periferico",
    imagen: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "18",
    nombre: "Mouse Ergonómico Logitech MX Master 3S Wireless",
    precio: 109990,
    watts: 5,
    categoria: "WORKSTATION",
    tipo: "periferico",
    imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "13",
    nombre: "Kit Oficina Teclado y Mouse Inalámbrico Logitech MK270",
    precio: 29990,
    watts: 2,
    categoria: "OFICINA",
    tipo: "periferico",
    imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "19",
    nombre: "Audífonos Logitech H111 Stereo con Micrófono (Gama Entrada)",
    precio: 14990,
    watts: 0,
    categoria: "OFICINA",
    tipo: "periferico",
    imagen: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "20",
    nombre: "Mouse Pad Básico Antideslizante Negro (25x21cm)",
    precio: 4990,
    watts: 0,
    categoria: "OFICINA",
    tipo: "periferico",
    imagen: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=800&q=80"
  }
];

export function Catalogo({ onAgregar }) {
  const [productos, setProductos] = useState(PRODUCTOS_CATALOGO);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [tipoSeleccionado, setTipoSeleccionado] = useState('todos'); // 'todos', 'componente', 'periferico'
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    const control = new AbortController();

    async function cargarDatos() {
      try {
        setCargando(true);
        const datosBackend = await componentesService.listar({ signal: control.signal });

        if (Array.isArray(datosBackend) && datosBackend.length > 0) {
          const idsFrontend = new Set(PRODUCTOS_CATALOGO.map((p) => String(p.id)));
          const nuevosDelBackend = datosBackend
            .filter((p) => !idsFrontend.has(String(p.id)))
            .map((p) => ({
              ...p,
              id: String(p.id),
              categoria: p.categoria || 'GAMER',
              tipo: p.tipo || 'componente',
              imagen:
                p.imagen ||
                'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
            }));

          setProductos([...PRODUCTOS_CATALOGO, ...nuevosDelBackend]);
        } else {
          setProductos(PRODUCTOS_CATALOGO);
        }

        setError(null);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message || 'Error al conectar con el servidor.');
        }
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
    return () => control.abort();
  }, []);

  const productosFiltrados =
    tipoSeleccionado === 'todos'
      ? productos
      : productos.filter((p) => (p.tipo || 'componente') === tipoSeleccionado);

  const handleAgregarCarrito = (prod) => {
    if (typeof onAgregar === 'function') {
      onAgregar(prod, 1);
      setMensajeExito(`"${prod.nombre}" añadido al carrito.`);
      setTimeout(() => setMensajeExito(''), 3000);
    }
  };

  if (cargando) {
    return (
      <main className="container py-5 text-center text-white my-5">
        <div className="spinner-border text-success mb-3" role="status"></div>
        <h5>Cargando catálogo de productos...</h5>
      </main>
    );
  }

  return (
    <main className="container py-4 text-start">
      {/* Encabezado */}
      <div className="mb-4">
        <h1 className="display-5 fw-bold mb-1" style={{ color: '#00FF66' }}>
          Catálogo de Productos
        </h1>
        <p className="text-secondary mb-3">
          Explora nuestra selección de componentes de hardware y periféricos de alta gama.
        </p>

        {error && (
          <div className="alert alert-warning fw-bold py-2">
            ⚠️ Aviso de conexión con el backend: {error} (Mostrando catálogo local).
          </div>
        )}

        {mensajeExito && (
          <div
            className="alert fw-bold py-2"
            style={{
              backgroundColor: 'rgba(0, 255, 102, 0.15)',
              border: '1px solid #00FF66',
              color: '#00FF66',
            }}
          >
            ✅ {mensajeExito}
          </div>
        )}

        {/* Pestañas de Navegación: Componentes y Periféricos */}
        <div className="d-flex flex-wrap gap-2 border-bottom border-secondary pb-3">
          <button
            type="button"
            onClick={() => setTipoSeleccionado('todos')}
            className={`btn fw-bold px-4 ${
              tipoSeleccionado === 'todos' ? 'btn-success' : 'btn-outline-secondary text-white'
            }`}
            style={
              tipoSeleccionado === 'todos'
                ? { backgroundColor: '#00FF66', color: '#000', border: 'none' }
                : {}
            }
          >
            📦 Todos ({productos.length})
          </button>
          <button
            type="button"
            onClick={() => setTipoSeleccionado('componente')}
            className={`btn fw-bold px-4 ${
              tipoSeleccionado === 'componente'
                ? 'btn-success'
                : 'btn-outline-secondary text-white'
            }`}
            style={
              tipoSeleccionado === 'componente'
                ? { backgroundColor: '#00FF66', color: '#000', border: 'none' }
                : {}
            }
          >
            🖥️ Componentes PC ({productos.filter((p) => (p.tipo || 'componente') === 'componente').length})
          </button>
          <button
            type="button"
            onClick={() => setTipoSeleccionado('periferico')}
            className={`btn fw-bold px-4 ${
              tipoSeleccionado === 'periferico'
                ? 'btn-success'
                : 'btn-outline-secondary text-white'
            }`}
            style={
              tipoSeleccionado === 'periferico'
                ? { backgroundColor: '#00FF66', color: '#000', border: 'none' }
                : {}
            }
          >
            🎧 Periféricos y Accesorios ({productos.filter((p) => p.tipo === 'periferico').length})
          </button>
        </div>
      </div>

      {/* Grilla de Productos */}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {productosFiltrados.map((prod) => (
          <div className="col" key={prod.id}>
            <div
              className="card h-100 text-white p-3 shadow-sm"
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1F2937',
                borderRadius: '12px',
              }}
            >
              <img
                src={prod.imagen}
                alt={prod.nombre}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200?text=BuildMyPC';
                }}
                style={{
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  backgroundColor: '#0B0F19',
                }}
                className="mb-3"
              />
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span
                  className="badge text-uppercase"
                  style={{ backgroundColor: '#1F2937', color: '#00FF66', fontSize: '0.75rem' }}
                >
                  {prod.categoria || 'GAMER'}
                </span>
                <span
                  className="badge text-uppercase bg-dark text-secondary border border-secondary"
                  style={{ fontSize: '0.65rem' }}
                >
                  {prod.tipo || 'componente'}
                </span>
              </div>
              <h6 className="fw-bold mb-3 text-white" style={{ minHeight: '40px' }}>
                {prod.nombre}
              </h6>

              <div className="mt-auto pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5" style={{ color: '#00FF66' }}>
                  {formatearCLP(prod.precio)}
                </span>
                <button
                  type="button"
                  className="btn btn-sm fw-bold px-3"
                  style={{ backgroundColor: '#00FF66', color: '#000', borderRadius: '6px' }}
                  onClick={() => handleAgregarCarrito(prod)}
                >
                  🛒 Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Catalogo;