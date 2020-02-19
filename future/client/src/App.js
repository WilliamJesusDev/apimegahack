import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { isLogin } from './services/auth';

import Signin from './pages/Signin';
import Home from './pages/Home';
import MyChannel from './pages/MyChannel';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (isLogin() ? <Component {...props} /> : <Redirect to="/signin" />)}
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={Signin} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/mychanell" component={MyChannel} />
        <PrivateRoute path="*" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
