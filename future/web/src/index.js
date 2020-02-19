const api = require("../services/api");

// exemplo de token
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNTgyMDQwNjcyLCJleHAiOjE1ODIwNDc4NzJ9.I7GCRZgjBDXK-MZK2_BA_pPgXV3Mkx3mBcdgr5Doc_g"

//exemple de função pra logar no sistema
async function getSession() {
  const user = await api
    .post(
      "/session", //metodo e rota
      { email: "user@email.com", password: "megahack" } //corpo da requisição
    )
    .then(response => response.data); //retorno de promisse

  return user;
}
// GetSession
getSession() //executando a função de login
  .then(user => {
    //usando o retorno da promisse

    /*/ GetAllCategories
    api
      .get(
        "/categories", //metodo e rota
        {
          params: {
            //query params
            x_jwt_token: user.token //token de autenticação do usuário.token (resposta da session)
          }
        }
      )
      .then(response => console.log(response.data)); //logando o retorno da promisse

    /// GetAllCategoriesWithPlaylists
    api
      .get("/categories/playlists", {
        params: {
          //query params
          x_jwt_token: user.token //token de autenticação do usuário.token (resposta da session)
        }
      })
      .then(response => console.log(response.data)); //logando o retorno da promisse

      */ // GetAllCategoriesWithPlaylists and Use
    api
      .get("/categories/playlists", {
        params: {
          //query params
          x_jwt_token: user.token //token de autenticação do usuário.token (resposta da session)
        }
      })
      .then(response => {
        //usando a resposta
        response.data.map(categorie => {
          //percorrendo a resposta
          console.log(categorie.title); //usando cada item da resposta
        });
      }); //logando o retorno da promisse
  });
//console.log(localStorage.getItem("logged"));
