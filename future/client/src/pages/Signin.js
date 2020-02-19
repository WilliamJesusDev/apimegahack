import React, { useState } from 'react';

import api from '../services/api';
import { login } from '../services/auth';

import './components/css/signin.css';
import logo from './components/img/logo.svg';

function Signin({ history }) {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [signup, setSignup] = useState(false);

  async function handleSignin(e) {
    e.preventDefault();
    if (email !== '') {
      if (password !== '') {
        await api
          .post('/session', {
            email,
            password
          })
          .then(response => {
            setUser(response.data);
            login(user.token);
          })
          .catch(err => {
            alert('Tente Novamente');
          });
        history.push('/');
      } else {
        alert('Preencha a senha');
      }
    } else {
      alert('Preencha o email');
    }
  }

  async function handleSignup(e) {}

  return (
    <div className="contentSignin">
      <form className="form-signin">
        <div className="text-center mb-4">
          <img className="mb-4" src={logo} alt="" width="400" />
          <h1 className="h2 mb-4 font-weight-normal">Seja Bem Vindo(a)</h1>
          <h2>Acesse agora a sua conta ou crie uma hoje mesmo!</h2>
        </div>

        <div className="form-label-group mt-5">
          <input
            type="email"
            id="inputEmail"
            name="inputEmail"
            className="form-control"
            placeholder="Endereço de Email"
            required
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="inputEmail">Endereço de Email</label>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            name="inputPassword"
            className="form-control"
            placeholder="Digite a Senha"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="inputPassword">Digite a Senha</label>
        </div>

        <div className="form-label-group" hidden={!signup}>
          <input
            type="password"
            id="inputCPassword"
            name="inputCPassword"
            className="form-control"
            placeholder="Confirme a Senha"
            required={signup}
            value={confirmPass}
            onChange={e => setConfirmPass(e.target.value)}
          />
          <label htmlFor="inputCPassword">Confirme a Senha</label>
        </div>

        <div className="checkbox mt-5 mb-3" hidden={signup}>
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          hidden={signup}
          onClick={e => handleSignin(e)}
        >
          Login
        </button>
        <button
          hidden={signup}
          className="btn btn-sm btn-success btn-block mx-auto"
          href="/"
          onClick={e => {
            e.preventDefault();
            setSignup(true);
          }}
        >
          Criar Conta
        </button>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-lg btn-success w-50 mr-2"
            type="submit"
            hidden={!signup}
            onClick={e => handleSignup(e)}
          >
            Salvar
          </button>
          <button
            className="btn btn-lg btn-danger w-50 ml-2"
            type="reset"
            hidden={!signup}
            onClick={e => {
              e.preventDefault();
              setSignup(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
