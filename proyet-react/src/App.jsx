import './styles/Utilidades.css';
import './App.css';

import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Armador } from './pages/Armador';
import { Auth } from './pages/Auth';

export function App() {
  return (
    <div className="app-container">
      <Inicio />
      <hr />
      <Catalogo />
      <hr />
      <Armador />
      <hr />
      <Auth />
    </div>
  );
}

export default App;
