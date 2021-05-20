import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashBoard from './pages/dashBoard/DashBoard';
import Home from './pages/home/Home';
import { getCurrentUserOperation } from './redux/user/operations';
import './App.css';
import Auth from './components/auth/Auth';
import Verification from './components/verification/Verification';

function App() {
  const { token } = useSelector(state => state.auth);
  const error = useSelector(state => state.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserOperation());
  }, [dispatch]);
  return (
    <div className="App">
      {error === 500 && <Redirect to="/server-down" />}
      <Switch>
        {token ? (
          <Switch>
            <Route path="/home">
              <DashBoard />
            </Route>
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" exact>
              <Home />
            </Route>
            <Route path="/verification">
              <Verification />
            </Route>
            <Route path="/sign-up">
              <Auth textBtn="Регистрация" type="signUp" />
            </Route>
            <Route path="/recover-password">
              <Auth textBtn="Восстановить" type="recoverPassword" />
            </Route>
            <Route path="/sign-in">
              <Auth textBtn="Вход" type="signIn" />
            </Route>
            <Redirect to="/home" />
          </Switch>
        )}
      </Switch>
    </div>
  );
}

export default App;
