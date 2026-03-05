import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar Componentes Globales
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';

// Importar Páginas
import Inicio from './pages/Inicio';
import Alimentacion from './pages/Alimentacion';
import Enciclopedia from './pages/Enciclopedia';
import Veterinarios from './pages/Veterinarios';
import Equipo from './pages/Equipo';
import DataShop from './pages/DataShop';
import Gracias from './pages/Gracias';

function App() {
  return (
    <Router>
      {/* El Navbar siempre visible en la parte superior */}
      <Navbar />

      {/* El motor de rutas: Cambia el contenido dinámicamente */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/alimentacion" element={<Alimentacion />} />
        <Route path="/enciclopedia" element={<Enciclopedia />} />
        <Route path="/veterinarios" element={<Veterinarios />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/datashop" element={<DataShop />} />
        <Route path="/gracias" element={<Gracias />} />
      </Routes>

      {/* El Footer siempre visible en la parte inferior */}
      <Footer />
    </Router>
  );
}

export default App;