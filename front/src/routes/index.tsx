import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import outraPagina from '../pages/outraPagina';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/total" component={outraPagina} />
  </Switch>
);

export default Routes;
