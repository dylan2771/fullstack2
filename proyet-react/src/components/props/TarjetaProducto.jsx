import { formatearCLP } from '../../logica/formato';

export const TarjetaProducto = ({ nombre, precio, watts, imagen, categoria }) => {
  return (
    <article className="tarjeta-producto">
      {imagen && <img src={imagen} alt={nombre} className="imagen-producto" />}
      <div className="info-producto">
        <span className="categoria-tag">{categoria}</span>
        <h3>{nombre}</h3>
        <p className="precio">{formatearCLP(precio)}</p>
        {watts > 0 && <p className="watts">Consumo: {watts}W</p>}
        <button className="btn-agregar">Agregar al Armador</button>
      </div>
    </article>
  );
};