import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        {/*O seletor CSS .links_list li espera que cada <li> contenha um único <NavLink>, para aplicar corretamente o margin-right. */}
        <li>
          {/* Para corrigir a herança da classe .active quando o texto nao for selecionado */}
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
            Entrar
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')}>
            Cadastrar
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;