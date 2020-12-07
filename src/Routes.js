import 'bootstrap/dist/css/bootstrap-grid.min.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './app/App';
import './assets/vendors/style';
import PrivateRoute from './PrivateRoute';

const Routes = () => {

  useEffect(() => {
    // initializeAuth();
    // Below line is disabling Eslint auto fix we don't want any value in use effect array
    // We want to call initializeAuth once. Please add this line while you working with hooks and you want to call it once.
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" component={App} />
      </Switch>
    </Router>
  );
};
export default Routes;
