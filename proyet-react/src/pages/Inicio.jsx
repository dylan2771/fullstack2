// src/pages/Inicio.jsx
import { useState } from 'react';
import { VideoNativo } from '../components/basicos/VideoNativo';
import { formatearCLP } from '../logica/formato';

export function Inicio({ setVista, onAgregar }) {
  const [mensajeExito, setMensajeExito] = useState('');
  const [copiadoCupón, setCopiadoCupón] = useState('');
  const [indiceOfertaActual, setIndiceOfertaActual] = useState(0);
  const [presupuestoSeleccionado, setPresupuestoSeleccionado] = useState('todos'); // 'todos', 'bajo', 'medio', 'alto'

  // Carrusel de Packs y Ofertas Flash con imágenes de Torres de PC
  const ofertasPacks = [
    {
      id: 'pack-gamer-pro',
      nombre: 'Pack PC Gamer Elite RTX 4070 + Placa AM5 + Fuente 850W + Monitor 180Hz',
      precioOriginal: 1250000,
      precioPromo: 1099990,
      ahorro: '¡Ahorras $150.000!',
      watts: 425,
      categoria: 'GAMER',
      imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      items: ['1x Torre RGB Ryzen 7 / RTX 4070', '1x Placa ASUS ROG Strix B650E-F WiFi', '1x Fuente Corsair 850W Gold', '1x Monitor 27" 180Hz']
    },
    {
      id: 'pack-workstation-pro',
      nombre: 'Pack Workstation i9-14900K + RTX 4090 + Placa Z790 + Fuente 1000W',
      precioOriginal: 2950000,
      precioPromo: 2699990,
      ahorro: '¡Ahorras $250.000!',
      watts: 745,
      categoria: 'WORKSTATION',
      imagen: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
      items: ['1x Gabinete Full Tower Core i9 / RTX 4090', '1x Placa ASUS ProArt Z790', '1x Fuente Seasonic 1000W Titanium', '1x Monitor 32" 4K']
    },
    {
      id: 'pack-oficina-duoc',
      nombre: 'Pack Productividad i5 + Placa H610 + Fuente 500W + Monitor 24"',
      precioOriginal: 390000,
      precioPromo: 349990,
      ahorro: '¡Ahorras $40.000!',
      watts: 115,
      categoria: 'OFICINA',
      imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      items: ['1x Torre Office Intel Core i5-12400F', '1x Placa MSI PRO H610M-G', '1x Fuente EVGA 500W', '1x Monitor 24" IPS']
    },
    {
      id: 'pack-streaming-rtx',
      nombre: 'Pack Streaming & Gaming RTX 3060 + Placa AM5 + Periféricos',
      precioOriginal: 750000,
      precioPromo: 659990,
      ahorro: '¡Ahorras $90.000!',
      watts: 225,
      categoria: 'GAMER',
      imagen: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80',
      items: ['1x Torre Gamer RTX 3060 12GB', '1x Placa B650', '1x Teclado Mecánico HyperX', '1x Audífonos Gamer']
    }
  ];

  // Productos por Rango de Presupuesto con imágenes de gabinetes y hardware
  const productosPorPresupuesto = [
    {
      id: 'pres-1',
      nombre: 'Kit Oficina Básico (Torre Micro-ATX + H610 + 16GB RAM + Fuente 500W)',
      precio: 175990,
      rango: 'bajo',
      categoria: 'OFICINA',
      imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pres-2',
      nombre: 'Tarjeta de Video NVIDIA RTX 3060 12GB OC',
      precio: 329990,
      rango: 'bajo',
      categoria: 'GAMER',
      imagen: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pres-3',
      nombre: 'PC Gamer Intermedio Ryzen 7 + RTX 4070 Super + Fuente 850W',
      precio: 1199990,
      rango: 'medio',
      categoria: 'GAMER',
      imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pres-4',
      nombre: 'Monitor Curvo Gamer 27" 180Hz + Teclado + Mouse Pro',
      precio: 334970,
      rango: 'bajo',
      categoria: 'GAMER',
      imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pres-5',
      nombre: 'Estación de Trabajo Extrema i9-14900K + RTX 4090 24GB',
      precio: 2529980,
      rango: 'alto',
      categoria: 'WORKSTATION',
      imagen: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const cupones = [
    { codigo: 'BUILDPC50', descuento: '$50.000', desc: 'En PCs Gamer Armados*' },
    { codigo: 'HYPERX20', descuento: '$20.000', desc: 'En Periféricos Seleccionados*' },
    { codigo: 'RTXTECH30', descuento: '$30.000', desc: 'En Tarjetas Gráficas*' },
    { codigo: 'OFFICE10', descuento: '$10.000', desc: 'En Monitores y Ofimática*' }
  ];

  const ofertaActual = ofertasPacks[indiceOfertaActual];

  const siguienteOferta = () => {
    setIndiceOfertaActual((prev) => (prev + 1) % ofertasPacks.length);
  };

  const anteriorOferta = () => {
    setIndiceOfertaActual((prev) => (prev - 1 + ofertasPacks.length) % ofertasPacks.length);
  };

  const copiarCodigo = (codigo) => {
    navigator.clipboard.writeText(codigo);
    setCopiadoCupón(codigo);
    setTimeout(() => setCopiadoCupón(''), 2500);
  };

  const handleAgregarCarrito = (producto) => {
    if (typeof onAgregar === 'function') {
      onAgregar(producto, 1);
      setMensajeExito(`"${producto.nombre}" añadido al carrito.`);
      setTimeout(() => setMensajeExito(''), 3000);
    }
  };

  const productosFiltradosPresupuesto = presupuestoSeleccionado === 'todos'
    ? productosPorPresupuesto
    : productosPorPresupuesto.filter(p => p.rango === presupuestoSeleccionado);

  return (
    <main className="contenido-principal pb-5">
      {mensajeExito && (
        <div className="container mt-3">
          <div className="alert fw-bold py-3 text-center" style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', border: '1px solid #00FF66', color: '#00FF66', borderRadius: '8px' }}>
            ✅ {mensajeExito}
          </div>
        </div>
      )}

      {/* Banner Principal con Video */}
      <section className="py-5" style={{ background: 'linear-gradient(180deg, #0B0F19 0%, #111827 100%)' }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-start">
              <span className="badge mb-3 px-3 py-2 fw-bold" style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66', border: '1px solid #00FF66' }}>
                ⚡ Plataforma de Armado de PCs 
              </span>
              <h1 className="display-4 fw-bold text-white mb-3">
                Bienvenido a <span style={{ color: '#00FF66' }}>BuildMyPC</span>
              </h1>
              <p className="fs-5 text-secondary mb-4">
                Arma tu PC gamer o de trabajo con la mejor compatibilidad, placas madre, fuentes de poder y cálculo energético en tiempo real.
              </p>
              {setVista && (
                <div className="d-flex gap-3">
                  <button type="button" className="btn btn-lg fw-bold px-4" style={{ backgroundColor: '#00FF66', color: '#000000', border: 'none' }} onClick={() => setVista('armador')}>
                    Armar mi PC 🚀
                  </button>
                  <button type="button" className="btn btn-lg btn-outline-light px-4" onClick={() => setVista('catalogo')}>
                    Ver Catálogo 🛒
                  </button>
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <div className="p-2 rounded-4" style={{ backgroundColor: '#111827', border: '1px solid #00FF66', boxShadow: '0 0 25px rgba(0, 255, 102, 0.2)' }}>
                <VideoNativo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE OFERTAS DESLIZABLES (TORRES DE PC / PACKS) */}
      <section className="container my-5 text-start">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-white m-0">🔥 Torres y Packs en Oferta Flash</h3>
            <small className="text-secondary">Desliza para ver más torres armadas con componentes completos</small>
          </div>
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-outline-success fw-bold px-3 py-2" 
              onClick={anteriorOferta}
              style={{ borderColor: '#00FF66', color: '#00FF66', borderRadius: '8px' }}
            >
              ❮ Anterior
            </button>
            <button 
              type="button" 
              className="btn fw-bold px-3 py-2" 
              onClick={siguienteOferta}
              style={{ backgroundColor: '#00FF66', color: '#000', borderRadius: '8px' }}
            >
              Siguiente ❯
            </button>
          </div>
        </div>

        <div className="card p-4 text-white shadow-lg" style={{ backgroundColor: '#111827', border: '2px solid #00FF66', borderRadius: '16px' }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <img 
                src={ofertaActual.imagen} 
                alt="Torre PC Promocional" 
                className="img-fluid rounded shadow"
                style={{ height: '260px', width: '100%', objectFit: 'cover', backgroundColor: '#0B0F19' }}
              />
            </div>
            <div className="col-lg-7">
              <div className="d-flex gap-2 mb-2">
                <span className="badge bg-success text-black fw-bold">{ofertaActual.ahorro}</span>
                <span className="badge bg-dark text-secondary border border-secondary">Torre {ofertaActual.categoria}</span>
              </div>
              <h4 className="fw-bold text-white mb-3">{ofertaActual.nombre}</h4>
              
              <ul className="list-unstyled small text-secondary mb-4">
                {ofertaActual.items.map((item, idx) => (
                  <li key={idx} className="py-1">• {item}</li>
                ))}
              </ul>

              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-3 border-top border-secondary">
                <div>
                  <span className="text-decoration-line-through text-secondary small d-block">
                    {formatearCLP(ofertaActual.precioOriginal)}
                  </span>
                  <span className="fs-3 fw-bold" style={{ color: '#00FF66' }}>
                    {formatearCLP(ofertaActual.precioPromo)}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn fw-bold px-4 py-3 shadow"
                  style={{ backgroundColor: '#00FF66', color: '#000', borderRadius: '8px' }}
                  onClick={() => handleAgregarCarrito({
                    id: ofertaActual.id,
                    nombre: ofertaActual.nombre,
                    precio: ofertaActual.precioPromo,
                    watts: ofertaActual.watts,
                    categoria: ofertaActual.categoria,
                    imagen: ofertaActual.imagen
                  })}
                >
                  🛒 Comprar Torre con Descuento
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN RECOMENDADOS SEGÚN PRESUPUESTO */}
      <section className="container my-5 text-start">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h3 className="fw-bold text-white m-0">🎯 Te Recomendamos según tu Presupuesto</h3>
            <small className="text-secondary">Filtra ofertas y equipos según lo que deseas invertir</small>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'bajo', label: '$0 a $500.000' },
              { id: 'medio', label: '$500k a $1.5M' },
              { id: 'alto', label: 'Más de $1.5M' }
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setPresupuestoSeleccionado(btn.id)}
                className={`btn btn-sm fw-bold ${presupuestoSeleccionado === btn.id ? 'btn-success' : 'btn-outline-secondary text-white'}`}
                style={presupuestoSeleccionado === btn.id ? { backgroundColor: '#00FF66', color: '#000', border: 'none', borderRadius: '6px' } : { borderRadius: '6px' }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4">
          {productosFiltradosPresupuesto.map((prod) => (
            <div className="col" key={prod.id}>
              <div className="card h-100 text-white p-3 shadow-sm" style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px' }}>
                <img 
                  src={prod.imagen} 
                  alt={prod.nombre} 
                  style={{ height: '160px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#0B0F19' }}
                  className="mb-3"
                />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge text-uppercase" style={{ backgroundColor: '#1F2937', color: '#00FF66', fontSize: '0.75rem' }}>
                    {prod.categoria}
                  </span>
                  <span className="badge text-uppercase bg-dark text-secondary border border-secondary" style={{ fontSize: '0.65rem' }}>
                    Recomendado
                  </span>
                </div>
                <h6 className="fw-bold mb-3 text-white" style={{ minHeight: '40px' }}>{prod.nombre}</h6>
                <div className="mt-auto pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5" style={{ color: '#00FF66' }}>{formatearCLP(prod.precio)}</span>
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
      </section>

      {/* Sección de Cupones */}
      <section className="container my-5 text-start">
        <h3 className="fw-bold text-white mb-4">🎟️ Cupones de Descuento Activos</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {cupones.map((cup) => (
            <div className="col" key={cup.codigo}>
              <div className="card h-100 p-4 text-center text-white d-flex flex-column justify-content-between shadow" style={{ backgroundColor: '#111827', border: '1px dashed #00FF66', borderRadius: '16px' }}>
                <div>
                  <span className="small text-secondary text-uppercase fw-bold d-block mb-1">Cupón Especial</span>
                  <h2 className="fw-bold mb-1" style={{ color: '#00FF66' }}>{cup.descuento}</h2>
                  <span className="small text-white fw-semibold d-block mb-3">dto. Adicional</span>
                  <p className="text-secondary small mb-4">{cup.desc}</p>
                </div>
                <div>
                  <button type="button" className="btn btn-sm fw-bold w-100 py-2 mb-2" style={{ backgroundColor: '#00FF66', color: '#000', borderRadius: '8px' }} onClick={() => copiarCodigo(cup.codigo)}>
                    {copiadoCupón === cup.codigo ? '✅ ¡Copiado!' : cup.codigo}
                  </button>
                  <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Haz clic para copiar el código</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Inicio;