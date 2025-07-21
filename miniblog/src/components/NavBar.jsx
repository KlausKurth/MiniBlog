import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../context/AuthContext';

import styles from './NavBar.module.css';



const NavBar = () => {
  const { user } = useAuthentication();

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
        {/*Se estiver autenticado não mostra entrar e cadastrar */}
        {!user && (
          <>
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
          </>
        )}
        {/*Se estiver autenticado mostra criar post e dasboard */}
        {user && (
          <>
          <li>
            <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : '')}>
              Novo Post
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboards" className={({ isActive }) => (isActive ? styles.active : '')}>
              Dashboard
            </NavLink>
          </li>
        </>
        )}
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