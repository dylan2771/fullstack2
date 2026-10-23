import { VideoNativo } from '../components/basicos/VideoNativo';

export const Inicio = ({ setVista }) => {
  return (
    <main className="contenido-principal pb-5">
      {/* Banner Principal / Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(180deg, #0B0F19 0%, #111827 100%)' }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">
            {/* Columna Texto de Bienvenida */}
            <div className="col-lg-6 text-start">
              <span 
                className="badge mb-3 px-3 py-2 fw-bold" 
                style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66', border: '1px solid #00FF66' }}
              >
                ⚡ Plataforma de Armado de PCs #1
              </span>
              <h1 className="display-4 fw-bold text-white mb-3">
                Bienvenido a <span style={{ color: '#00FF66' }}>BuildMyPC</span>
              </h1>
              <p className="fs-5 text-secondary mb-4">
                Arma tu PC gamer o de trabajo con la mejor compatibilidad y calcula el consumo de potencia energética en tiempo real.
              </p>
              
              {setVista && (
                <div className="d-flex gap-3">
                  <button 
                    type="button"
                    className="btn btn-lg fw-bold px-4" 
                    style={{ backgroundColor: '#00FF66', color: '#000000', border: 'none' }}
                    onClick={() => setVista('armador')}
                  >
                    Armar mi PC 🚀
                  </button>
                  <button 
                    type="button"
                    className="btn btn-lg btn-outline-light px-4"
                    onClick={() => setVista('catalogo')}
                  >
                    Ver Catálogo 🛒
                  </button>
                </div>
              )}
            </div>

            {/* Columna Video Nativo con Marco Gamer */}
            <div className="col-lg-6">
              <div 
                className="p-2 rounded-4" 
                style={{ 
                  backgroundColor: '#111827', 
                  border: '1px solid #00FF66', 
                  boxShadow: '0 0 25px rgba(0, 255, 102, 0.2)' 
                }}
              >
                <VideoNativo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Inferior de Beneficios */}
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-md-4 text-start">
            <div className="card h-100 p-4" style={{ backgroundColor: '#111827', border: '1px solid #1F2937' }}>
              <div className="fs-1 mb-2" style={{ color: '#00FF66' }}>⚡</div>
              <h4 className="text-white fw-bold">Cálculo de Watts</h4>
              <p className="text-secondary small mb-0">Calcula automáticamente el consumo para seleccionar la fuente de poder adecuada.</p>
            </div>
          </div>
          <div className="col-md-4 text-start">
            <div className="card h-100 p-4" style={{ backgroundColor: '#111827', border: '1px solid #1F2937' }}>
              <div className="fs-1 mb-2" style={{ color: '#00FF66' }}>🛡️</div>
              <h4 className="text-white fw-bold">Compatibilidad Total</h4>
              <p className="text-secondary small mb-0">Valida automáticamente sockets de CPU, memorias RAM y factor de forma.</p>
            </div>
          </div>
          <div className="col-md-4 text-start">
            <div className="card h-100 p-4" style={{ backgroundColor: '#111827', border: '1px solid #1F2937' }}>
              <div className="fs-1 mb-2" style={{ color: '#00FF66' }}>💵</div>
              <h4 className="text-white fw-bold">Cotizaciones en Vivo</h4>
              <p className="text-secondary small mb-0">Obtén tu presupuesto final instantáneo para guardar o compartir.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};