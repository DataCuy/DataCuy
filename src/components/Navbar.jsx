import { Link } from 'react-router-dom';
import '../assets/css/styles.css'; // Ajusta la ruta según tu estructura

export const Navbar = () => {
    return (
        <header className="main-header">
            <nav className="navigation-container">
                <Link to="/" className="logo">🐹 DataCuy</Link>
                <ul className="nav-links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/alimentacion">Alimentación</Link></li>
                    <li><Link to="/enciclopedia">Enciclopedia</Link></li>
                    <li><Link to="/veterinarios">Veterinarios</Link></li>
                    <li><Link to="/equipo">Equipo</Link></li>
                    <li><Link to="/datashop">DataShop</Link></li>
                </ul>
            </nav>
        </header>
    );
};