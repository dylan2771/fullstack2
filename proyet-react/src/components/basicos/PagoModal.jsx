// src/components/basicos/PagoModal.jsx
import React, { useState, useEffect } from 'react';
import { formatearCLP } from '../../logica/formato';

export function PagoModal({ show, onClose, items = [], montoTotalFinal, onConfirmarPago }) {
  const [formData, setFormData] = useState({
    nombreTarjeta: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!show) {
      setFormData({
        nombreTarjeta: '',
        numeroTarjeta: '',
        expiracion: '',
        cvv: ''
      });
      setError('');
    }
  }, [show]);

  if (!show) return null;

  const listaItems = Array.isArray(items) ? items : [];

  // El monto total final ya viene con el descuento aplicado desde el CarritoModal
  const totalFinal = typeof montoTotalFinal === 'number' ? montoTotalFinal : 0;

  const detectarTipoTarjeta = (numero) => {
    const numLimpio = numero.replace(/\D/g, '');
    if (/^4/.test(numLimpio)) return { nombre: 'VISA', badge: 'bg-primary' };
    if (/^(5[1-5]|2[2-7])/.test(numLimpio)) return { nombre: 'Mastercard', badge: 'bg-danger' };
    if (/^3[47]/.test(numLimpio)) return { nombre: 'AMEX', badge: 'bg-info text-dark' };
    return { nombre: 'Desconocida', badge: 'bg-secondary' };
  };

  const tipoTarjeta = detectarTipoTarjeta(formData.numeroTarjeta);

  const handleChangeNumeroTarjeta = (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formateado = soloNumeros.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData({ ...formData, numeroTarjeta: formateado });
    setError('');
  };

  const handleChangeExpiracion = (e) => {
    let soloNumeros = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (soloNumeros.length >= 3) {
      soloNumeros = `${soloNumeros.slice(0, 2)}/${soloNumeros.slice(2)}`;
    }
    setFormData({ ...formData, expiracion: soloNumeros });
    setError('');
  };

  const handleChangeCVV = (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData({ ...formData, cvv: soloNumeros });
    setError('');
  };

  const handleChangeTexto = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validarFechaExpiracion = (expiracionStr) => {
    if (!expiracionStr || expiracionStr.length !== 5 || !expiracionStr.includes('/')) {
      return "Ingresa una fecha de expiración válida en formato MM/AA.";
    }

    const [mesStr, anioStr] = expiracionStr.split('/');
    const mes = parseInt(mesStr, 10);
    const anioDosDigitos = parseInt(anioStr, 10);

    if (isNaN(mes) || isNaN(anioDosDigitos)) {
      return "Formato numérico de fecha inválido.";
    }

    if (mes < 1 || mes > 12) {
      return `El mes (${mesStr}) es inválido. Debe estar entre 01 y 12.`;
    }

    const anioCompleto = 2000 + anioDosDigitos;
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;

    if (anioCompleto < anioActual) {
      return `Tarjeta vencida. El año 20${anioStr} ya venció.`;
    }

    if (anioCompleto === anioActual && mes < mesActual) {
      return `Tarjeta vencida. El mes ${mesStr}/20${anioStr} ya transcurrió.`;
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const numLimpio = formData.numeroTarjeta.replace(/\D/g, '');

    if (numLimpio.length !== 16) {
      setError('El número de tarjeta debe contener exactamente 16 dígitos.');
      return;
    }

    if (!formData.nombreTarjeta.trim()) {
      setError('Por favor ingresa el nombre del titular.');
      return;
    }

    const errorFecha = validarFechaExpiracion(formData.expiracion);
    if (errorFecha) {
      setError(errorFecha);
      return;
    }

    if (formData.cvv.length < 3) {
      setError('El código CVV debe tener 3 o 4 dígitos.');
      return;
    }

    const nuevoPedido = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      fecha: new Date().toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...listaItems],
      total: totalFinal,
      metodoPago: `${tipoTarjeta.nombre} (${formData.numeroTarjeta.slice(-4)})`,
      ultimosDigitos: formData.numeroTarjeta.slice(-4) || '4242'
    };

    if (typeof onConfirmarPago === 'function') {
      onConfirmarPago(nuevoPedido);
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content text-white border-success shadow-lg"
          style={{ backgroundColor: '#111827' }}
        >
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-success fw-bold">
              💳 Simulación de Pago Segura
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger py-2 fw-bold">{error}</div>}

              {/* Vista previa gráfica de la Tarjeta */}
              <div 
                className="p-3 mb-4 rounded shadow-sm text-white d-flex flex-column justify-content-between" 
                style={{ 
                  height: '150px', 
                  background: 'linear-gradient(135deg, #1F2937 0%, #0F172A 100%)',
                  border: '1px solid #374151'
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold tracking-wider" style={{ color: '#00FF66' }}>BuildMyPC Pay</span>
                  <span className={`badge ${tipoTarjeta.badge} fs-6 fw-bold`}>
                    {tipoTarjeta.nombre}
                  </span>
                </div>
                <div className="fs-4 fw-bold font-monospace tracking-widest my-2">
                  {formData.numeroTarjeta || '•••• •••• •••• ••••'}
                </div>
                <div className="d-flex justify-content-between text-uppercase small">
                  <div>
                    <span className="text-secondary d-block" style={{ fontSize: '10px' }}>Titular</span>
                    <strong>{formData.nombreTarjeta || 'NOMBRE APELLIDO'}</strong>
                  </div>
                  <div>
                    <span className="text-secondary d-block" style={{ fontSize: '10px' }}>Vence</span>
                    <strong>{formData.expiracion || 'MM/AA'}</strong>
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label className="form-label small text-secondary fw-bold">Nombre del Titular</label>
                  <input
                    type="text"
                    name="nombreTarjeta"
                    placeholder="Ej: Maximiliano Veas"
                    value={formData.nombreTarjeta}
                    onChange={handleChangeTexto}
                    className="form-control bg-dark text-white border-secondary"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small text-secondary fw-bold">Número de Tarjeta (16 dígitos)</label>
                  <input
                    type="text"
                    name="numeroTarjeta"
                    placeholder="4500 0000 0000 0000"
                    value={formData.numeroTarjeta}
                    onChange={handleChangeNumeroTarjeta}
                    className="form-control bg-dark text-white border-secondary font-monospace"
                    required
                  />
                </div>

                <div className="col-6 col-md-6">
                  <label className="form-label small text-secondary fw-bold">Expiración (MM/AA)</label>
                  <input
                    type="text"
                    name="expiracion"
                    placeholder="12/28"
                    value={formData.expiracion}
                    onChange={handleChangeExpiracion}
                    className="form-control bg-dark text-white border-secondary font-monospace"
                    required
                  />
                </div>

                <div className="col-6 col-md-6">
                  <label className="form-label small text-secondary fw-bold">Código CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChangeCVV}
                    className="form-control bg-dark text-white border-secondary font-monospace"
                    required
                  />
                </div>
              </div>

              {/* Resumen Final limpio con el total que ya trae el descuento del carrito */}
              <div
                className="p-3 rounded border border-secondary"
                style={{ backgroundColor: '#080C14' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-secondary fs-6">Monto Total a Procesar:</span>
                  <span className="text-success fs-3 fw-bold">
                    {formatearCLP(totalFinal)}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer border-secondary justify-content-between">
              <button
                type="button"
                className="btn btn-outline-light btn-sm"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-success fw-bold text-dark px-4"
              >
                Pagar {formatearCLP(totalFinal)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PagoModal;