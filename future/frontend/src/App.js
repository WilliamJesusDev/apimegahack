import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import api from "./services/api";

function App() {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getData() {
      const data = await getCategories(await getSession());
      setCategories(data);
    }
    getData();
  }, []);

  async function getSession() {
    const response = await api
      .post(
        "/session", //metodo e rota
        { email: "user@email.com", password: "megahack" } //corpo da requisição
      )
      .then(response => response.data); //retorno de promisse
    setUser(response);
    return response;
  }

  async function getCategories(session) {
    const response = await api
      .get("/categories/playlists", {
        params: {
          //query params
          x_jwt_token: session.token //token de autenticação do usuário.token (resposta da session)
        }
      })
      .then(response => response.data); //logando o retorno da promisse

    return response;
  }

  async function setPreferences(e) {
    const preference = e.target.getAttribute("data_key");
    const response = await api
      .get(
        `/profile/${user._id}/categories`,
        {
          categories: [preference]
        },
        {
          params: {
            //query params
            x_jwt_token: user.token //token de autenticação do usuário.token (resposta da session)
          }
        }
      )
      .then(response => response.data);
    console.log(response);
    //setUser(user)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <section>
          {categories
            ? categories.map(categorie => (
                <button
                  style={{ margin: 5 }}
                  key={categorie._id}
                  data_key={categorie._id}
                  onClick={setPreferences}
                >
                  {categorie.title}
                </button>
              ))
            : null}
        </section>
      </header>
      <footer></footer>
    </div>
  );
}

export default App;
