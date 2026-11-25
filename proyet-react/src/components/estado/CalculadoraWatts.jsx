// src/components/estado/CalculadoraWatts.jsx
import { useState } from 'react';
import { calcularConsumoTotalWatts, obtenerFuenteRecomendadaWatts } from '../../logica/armador';
import { formatearCLP, calcularIVA, calcularTotalConIVA } from '../../logica/formato';

const LISTA_PRODUCTOS_COMPLETA = [
  // --- COMPONENTES PC ---
  { id: "1", nombre: "Tarjeta de Video NVIDIA RTX 3060 12GB", precio: 329990, watts: 170, categoria: "GAMER", tipo: "componente", imagen: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80" },
  { id: "2", nombre: "Procesador AMD Ryzen 7 7800X3D", precio: 449990, watts: 120, categoria: "GAMER", tipo: "componente", imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80" },
  { id: "3", nombre: "Tarjeta de Video NVIDIA RTX 4070 Super 12GB", precio: 699990, watts: 220, categoria: "GAMER", tipo: "componente", imagen: "https://www.hardwareluxx.de/images/cdn02/uploads/2023/Apr/timely_controller_gn/nvidia-geforce-rtx-4070-fe-00002_1920px.jpg" },
  { id: "21", nombre: "Placa Madre ASUS ROG Strix B650E-F Gaming WiFi AM5", precio: 279990, watts: 35, categoria: "GAMER", tipo: "componente", imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
  { id: "22", nombre: "Fuente de Poder Corsair RM850e 850W 80+ Gold Modular", precio: 139990, watts: 0, categoria: "GAMER", tipo: "componente", imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80" },
  { id: "6", nombre: "Memoria RAM Corsair Vengeance DDR5 32GB (2x16GB)", precio: 129990, watts: 15, categoria: "GAMER", tipo: "componente", imagen: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80" },
  { id: "4", nombre: "Procesador Intel Core i9-14900K", precio: 629990, watts: 253, categoria: "WORKSTATION", tipo: "componente", imagen: "https://www.muycomputer.com/wp-content/uploads/2023/09/Intel-1.jpg" },
  { id: "5", nombre: "Tarjeta de Video NVIDIA RTX 4090 24GB", precio: 1899900, watts: 450, categoria: "WORKSTATION", tipo: "componente", imagen: "https://www.winpy.cl/files/36915-3331-ASUS-ROG-Strix-GeForce-RTX-4090-24G-1.jpg" },
  { id: "23", nombre: "Placa Madre ASUS ProArt Z790-Creator WiFi DDR5", precio: 469990, watts: 45, categoria: "WORKSTATION", tipo: "componente", imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
  { id: "24", nombre: "Fuente de Poder Seasonic PRIME TX-1000 1000W 80+ Titanium", precio: 289990, watts: 0, categoria: "WORKSTATION", tipo: "componente", imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80" },
  { id: "10", nombre: "Memoria RAM Kingston FURY Renegade DDR5 64GB", precio: 249990, watts: 25, categoria: "WORKSTATION", tipo: "componente", imagen: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80" },
  { id: "11", nombre: "Monitor Profesional 32\" 4K UHD IPS HDR", precio: 499990, watts: 45, categoria: "WORKSTATION", tipo: "componente", imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80" },
  { id: "7", nombre: "Memoria RAM Kingston FURY Beast DDR4 16GB", precio: 45990, watts: 10, categoria: "OFICINA", tipo: "componente", imagen: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80" },
  { id: "12", nombre: "Procesador Intel Core i5-12400F", precio: 139990, watts: 65, categoria: "OFICINA", tipo: "componente", imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80" },
  { id: "25", nombre: "Placa Madre MSI PRO H610M-G DDR4 Micro-ATX", precio: 84990, watts: 25, categoria: "OFICINA", tipo: "componente", imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
  { id: "26", nombre: "Fuente de Poder EVGA 500 W1 500W 80+ White", precio: 44990, watts: 0, categoria: "OFICINA", tipo: "componente", imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80" },
  { id: "14", nombre: "Monitor Oficina 24\" Full HD IPS", precio: 129990, watts: 20, categoria: "OFICINA", tipo: "componente", imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80" },

  // --- PERIFÉRICOS Y ACCESORIOS ---
  { id: "8", nombre: "Teclado Mecánico Gamer HyperX Alloy Origins RGB", precio: 89990, watts: 5, categoria: "GAMER", tipo: "periferico", imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80" },
  { id: "9", nombre: "Mouse Gamer Logitech G Pro X Superlight Wireless", precio: 119990, watts: 5, categoria: "GAMER", tipo: "periferico", imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80" },
  { id: "15", nombre: "Mouse Gamer Logitech G502 HERO High Performance", precio: 49990, watts: 5, categoria: "GAMER", tipo: "periferico", imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80" },
  { id: "16", nombre: "Mouse Pad Gamer XXL Extended RGB (90x40cm)", precio: 24990, watts: 3, categoria: "GAMER", tipo: "periferico", imagen: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=800&q=80" },
  { id: "17", nombre: "Audífonos Gamer Logitech G Pro X 2 Lightspeed Wireless", precio: 229990, watts: 5, categoria: "GAMER", tipo: "periferico", imagen: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80" },
  { id: "18", nombre: "Mouse Ergonómico Logitech MX Master 3S Wireless", precio: 109990, watts: 5, categoria: "WORKSTATION", tipo: "periferico", imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80" },
  { id: "13", nombre: "Kit Oficina Teclado y Mouse Inalámbrico Logitech MK270", precio: 29990, watts: 2, categoria: "OFICINA", tipo: "periferico", imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80" },
  { id: "19", nombre: "Audífonos Logitech H111 Stereo (Gama Entrada)", precio: 14990, watts: 0, categoria: "OFICINA", tipo: "periferico", imagen: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80" },
  { id: "20", nombre: "Mouse Pad Básico Antideslizante Negro", precio: 4990, watts: 0, categoria: "OFICINA", tipo: "periferico", imagen: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=800&q=80" }
];

export const CalculadoraWatts = ({ onGuardarCotizacion }) => {
  const [seleccionados, setSeleccionados] = useState([]);
  const [tipoSeccion, setTipoSeccion] = useState('todos');
  const [categoriaFiltro, setCategoriaFiltro] = useState('TODAS');
  const [nombreCotizacion, setNombreCotizacion] = useState('');
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  const productosFiltrados = LISTA_PRODUCTOS_COMPLETA.filter(p => {
    const cumpleTipo = tipoSeccion === 'todos' || p.tipo === tipoSeccion;
    const cumpleCat = categoriaFiltro === 'TODAS' || p.categoria?.toUpperCase() === categoriaFiltro;
    return cumpleTipo && cumpleCat;
  });

  const alternarSeleccion = (producto) => {
    const existe = seleccionados.some(p => p.id === producto.id);
    if (existe) {
      setSeleccionados(seleccionados.filter(p => p.id !== producto.id));
    } else {
      setSeleccionados([...seleccionados, producto]);
    }
  };

  const totalWatts = calcularConsumoTotalWatts(seleccionados);
  const fuenteRecomendada = obtenerFuenteRecomendadaWatts(totalWatts);
  const subtotalPrecio = seleccionados.reduce((acc, p) => acc + p.precio, 0);
  const ivaCalculado = calcularIVA(subtotalPrecio);
  const totalConIVA = calcularTotalConIVA(subtotalPrecio);
  const porcentajeWatts = Math.min((totalWatts / 1000) * 100, 100);

  const copiarResumen = () => {
    if (seleccionados.length === 0) return;
    const listaNombres = seleccionados.map(p => `• ${p.nombre} (${p.watts}W) - ${formatearCLP(p.precio)}`).join('\n');
    const resumenText = `⚡ COTIZACIÓN BUILDMYPC\n------------------------------\n${listaNombres}\n------------------------------\nTotal: ${formatearCLP(totalConIVA)}`;
    navigator.clipboard.writeText(resumenText);
    setMensajeCopiado(true);
    setTimeout(() => setMensajeCopiado(false), 2500);
  };

  const handleGuardar = () => {
    if (seleccionados.length === 0 || typeof onGuardarCotizacion !== 'function') return;

    let cpuId = null;
    let gpuId = null;
    let motherboardId = null;
    let ramId = null;
    let storageId = null;
    let psuId = null;

    seleccionados.forEach(p => {
      const n = p.nombre.toLowerCase();
      if (n.includes('procesador') || n.includes('ryzen') || n.includes('intel core')) cpuId = Number(p.id);
      else if (n.includes('rtx') || n.includes('tarjeta de video')) gpuId = Number(p.id);
      else if (n.includes('placa madre')) motherboardId = Number(p.id);
      else if (n.includes('memoria ram')) ramId = Number(p.id);
      else if (n.includes('fuente de poder')) psuId = Number(p.id);
      else if (n.includes('ssd') || n.includes('disco') || n.includes('almacenamiento')) storageId = Number(p.id);
    });

    const nombreFinal = nombreCotizacion.trim() || 'Armado PC Personalizado';

    onGuardarCotizacion({
      nombreEnsamble: nombreFinal, // 👈 Obligatorio para el DTO del backend
      titulo: nombreFinal,         // Mantenido para el frontend
      items: seleccionados,
      totalWatts,
      fuenteRecomendada,
      subtotal: subtotalPrecio,
      iva: ivaCalculado,
      totalFinal: totalConIVA,
      userId: 1,
      cpuId: cpuId || 2,
      gpuId: gpuId || 1,
      motherboardId: motherboardId || 21,
      ramId: ramId || 6,
      storageId: storageId || 7,
      psuId: psuId || 22
    });

    setNombreCotizacion('');
    setSeleccionados([]);
  };

  return (
    <section className="container py-2 text-start">
      <div className="card p-3 mb-3 text-white" style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px' }}>
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <button
            type="button"
            onClick={() => setTipoSeccion('todos')}
            className={`btn fw-bold px-4 ${tipoSeccion === 'todos' ? 'btn-success' : 'btn-outline-secondary text-white'}`}
            style={tipoSeccion === 'todos' ? { backgroundColor: '#00FF66', color: '#000', border: 'none', borderRadius: '8px' } : { borderRadius: '8px' }}
          >
            📦 Todos
          </button>
          <button
            type="button"
            onClick={() => setTipoSeccion('componente')}
            className={`btn fw-bold px-4 ${tipoSeccion === 'componente' ? 'btn-success' : 'btn-outline-secondary text-white'}`}
            style={tipoSeccion === 'componente' ? { backgroundColor: '#00FF66', color: '#000', border: 'none', borderRadius: '8px' } : { borderRadius: '8px' }}
          >
            🖥️ Componentes PC
          </button>
          <button
            type="button"
            onClick={() => setTipoSeccion('periferico')}
            className={`btn fw-bold px-4 ${tipoSeccion === 'periferico' ? 'btn-success' : 'btn-outline-secondary text-white'}`}
            style={tipoSeccion === 'periferico' ? { backgroundColor: '#00FF66', color: '#000', border: 'none', borderRadius: '8px' } : { borderRadius: '8px' }}
          >
            🎧 Periféricos y Accesorios
          </button>
        </div>
      </div>

      <div className="card p-3 mb-4 text-white" style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h5 className="fw-bold mb-1" style={{ color: '#00FF66' }}>1. Selecciona los Componentes</h5>
            <p className="text-secondary small mb-0">Haz clic sobre las tarjetas para agregar o quitar piezas de tu armado.</p>
          </div>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="small text-secondary fw-bold me-1">Filtrar:</span>
            {['TODAS', 'GAMER', 'WORKSTATION', 'OFICINA'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoriaFiltro(cat)}
                className={`btn btn-sm fw-bold ${categoriaFiltro === cat ? 'btn-success' : 'btn-outline-secondary text-white'}`}
                style={categoriaFiltro === cat ? { backgroundColor: '#00FF66', color: '#000', border: 'none', borderRadius: '6px' } : { borderRadius: '6px' }}
              >
                {cat.charAt(0) + cat.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-7 col-xl-8">
          {productosFiltrados.length === 0 ? (
            <div className="card p-4 text-center text-white" style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px' }}>
              <p className="text-secondary mb-0">No hay productos disponibles para este filtro.</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {productosFiltrados.map((prod) => {
                const estaSeleccionado = seleccionados.some(p => p.id === prod.id);
                return (
                  <div className="col" key={prod.id}>
                    <div 
                      className="card h-100 p-3 text-white" 
                      style={{ 
                        backgroundColor: estaSeleccionado ? '#0c2214' : '#111827', 
                        border: estaSeleccionado ? '2px solid #00FF66' : '1px solid #1F2937', 
                        borderRadius: '12px',
                        cursor: 'pointer'
                      }}
                      onClick={() => alternarSeleccion(prod)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          src={prod.imagen} 
                          alt={prod.nombre} 
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=Hardware'; }}
                          style={{ width: '75px', height: '75px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#0B0F19' }} 
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <div>
                              <span className="badge text-uppercase me-1" style={{ backgroundColor: '#1F2937', color: '#00FF66', fontSize: '0.65rem' }}>
                                {prod.categoria}
                              </span>
                              <span className="badge text-uppercase bg-dark text-secondary border border-secondary" style={{ fontSize: '0.6rem' }}>
                                {prod.tipo}
                              </span>
                            </div>
                            <span className="badge fw-bold" style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66' }}>
                              ⚡ {prod.watts}W
                            </span>
                          </div>
                          <h6 className="fw-bold mb-2 small text-white">{prod.nombre}</h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold" style={{ color: '#00FF66' }}>{formatearCLP(prod.precio)}</span>
                            <span className={`badge ${estaSeleccionado ? 'bg-success text-black' : 'bg-dark text-secondary border border-secondary'}`}>
                              {estaSeleccionado ? '✓ Añadido' : '+ Agregar'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="col-lg-5 col-xl-4">
          <div className="card p-4 text-white shadow" style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px', position: 'sticky', top: '90px' }}>
            <h5 className="fw-bold mb-3 d-flex justify-content-between align-items-center" style={{ color: '#00FF66' }}>
              <span>⚡ Resumen del Armado</span>
              <span className="badge bg-dark border border-secondary text-white fs-6">{seleccionados.length} piezas</span>
            </h5>

            <div className="p-3 mb-3 rounded" style={{ backgroundColor: '#0B0F19', border: '1px solid #1F2937' }}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <small className="text-secondary">Consumo Total:</small>
                <span className="fw-bold text-white fs-5">{totalWatts} Watts</span>
              </div>
              <div className="progress mb-2" style={{ height: '8px', backgroundColor: '#1F2937' }}>
                <div className="progress-bar" role="progressbar" style={{ width: `${porcentajeWatts}%`, backgroundColor: '#00FF66' }}></div>
              </div>
              <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary">
                <small className="text-secondary">Fuente Recomendada:</small>
                <span className="fw-bold fs-5" style={{ color: '#00FF66' }}>{fuenteRecomendada}W</span>
              </div>
            </div>

            <div className="mb-3" style={{ maxHeight: '160px', overflowY: 'auto' }}>
              {seleccionados.length === 0 ? (
                <p className="text-secondary small text-center py-3 mb-0 border border-dashed border-secondary rounded">
                  No has seleccionado ninguna pieza todavía.
                </p>
              ) : (
                <ul className="list-group list-group-flush">
                  {seleccionados.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent text-white px-0 py-2 border-secondary small">
                      <span className="text-truncate me-2" style={{ maxWidth: '180px' }}>{item.nombre}</span>
                      <span className="fw-bold" style={{ color: '#00FF66' }}>{formatearCLP(item.precio)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-3 border-top border-secondary">
              <div className="d-flex justify-content-between small text-secondary mb-1">
                <span>Subtotal Neto:</span>
                <span>{formatearCLP(subtotalPrecio)}</span>
              </div>
              <div className="d-flex justify-content-between small text-secondary mb-3">
                <span>IVA (19%):</span>
                <span>{formatearCLP(ivaCalculado)}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3 pt-2 border-top border-secondary">
                <span className="fw-bold fs-6">Total Final:</span>
                <span className="fw-bold fs-4 text-white">{formatearCLP(totalConIVA)}</span>
              </div>
            </div>

            {typeof onGuardarCotizacion === 'function' && (
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm text-white"
                  style={{ backgroundColor: '#0B0F19', border: '1px solid #1F2937', borderRadius: '6px' }}
                  placeholder="Nombre de tu PC (Ej: PC Gamer)"
                  value={nombreCotizacion}
                  onChange={(e) => setNombreCotizacion(e.target.value)}
                />
              </div>
            )}

            <div className="d-grid gap-2">
              {typeof onGuardarCotizacion === 'function' && (
                <button 
                  type="button"
                  className="btn fw-bold py-2 shadow-sm" 
                  style={{ backgroundColor: seleccionados.length > 0 ? '#00FF66' : '#1F2937', color: seleccionados.length > 0 ? '#000' : '#6C757D', border: 'none', borderRadius: '8px' }}
                  disabled={seleccionados.length === 0}
                  onClick={handleGuardar}
                >
                  💾 Guardar Cotización
                </button>
              )}
              <button 
                type="button"
                className="btn btn-outline-success fw-bold py-2" 
                style={{ borderRadius: '8px' }}
                disabled={seleccionados.length === 0}
                onClick={copiarResumen}
              >
                {mensajeCopiado ? '✅ ¡Configuración Copiada!' : '📋 Copiar Configuración'}
              </button>
              {seleccionados.length > 0 && (
                <button 
                  type="button"
                  className="btn btn-outline-danger btn-sm py-2 fw-semibold"
                  style={{ borderRadius: '8px' }}
                  onClick={() => setSeleccionados([])}
                >
                  🗑️ Limpiar Selección
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};