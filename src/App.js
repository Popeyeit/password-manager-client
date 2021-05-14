import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashBoard from './pages/dashBoard/DashBoard';
// import Sidebar from './components/sidebar/Sidebar';
// import { getCurrentUserOperation } from './redux/user/operation';
import './App.css';

const redirectToHome = () => {
  return <Redirect to="/home" />;
};

function App() {
  const { token } = useSelector(state => state.auth);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCurrentUserOperation());
  // }, [dispatch]);
  return (
    <div className="App">
      <Switch>
        {!token ? (
          <Route path="/home">
            <DashBoard />
          </Route>
        ) : (
          <Route path="/home"></Route>
        )}
      </Switch>
      {redirectToHome()}
    </div>
  );
}

export default App;
