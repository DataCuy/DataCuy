import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/styles.css'; 

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="main-header">
            <nav className="navigation-container">
                <Link to="/" className="logo">🐹 DataCuy</Link>
                
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
                    <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                </button>

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
                    <li><Link to="/alimentacion" onClick={toggleMenu}>Alimentación</Link></li>
                    <li><Link to="/enciclopedia" onClick={toggleMenu}>Enciclopedia</Link></li>
                    <li><Link to="/veterinarios" onClick={toggleMenu}>Veterinarios</Link></li>
                    <li><Link to="/equipo" onClick={toggleMenu}>Equipo</Link></li>
                    <li><Link to="/datashop" onClick={toggleMenu}>DataShop</Link></li>
                </ul>
            </nav>
        </header>
    );
};