import React from 'react';
import user from './img/user-icon.svg';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand nome-globo" to="/#">
          globoplay
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#conteudoNavbarSuportado"
          aria-controls="conteudoNavbarSuportado"
          aria-expanded="false"
          aria-label="Alterna navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/#">
                Agora na globo <span className="sr-only">(página atual)</span>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/meu-canal">
                Meu Canal
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Novelas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Séries
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Cinema
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Infantil
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Mais
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/#">
                  Humor
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/#">
                  Variedades
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/#">
                  Realities
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/#">
                  Música
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/#">
                  Documentários
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/#">
                  Jornalismo
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/#">
                  Esportes
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/#">
                  Programas Locais
                </a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <a className="navbar-brand" href="/#">
              <i className="icon-search"></i>
            </a>
            <a className="navbar-brand" href="/#">
              Busca
            </a>
            <a className="navbar-brand " href="/#">
              <i className="icon-bell-alt icone-notificacao"></i>
            </a>
            <a className="navbar-brand " href="/#">
              <img src={user} alt="user" className="img-user" />
            </a>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
