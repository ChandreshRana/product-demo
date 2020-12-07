import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../common/constants';
import Error404 from '../Error404';
import Dashboard from '../modules/Dashboard';
import TrashProductList from '../modules/products/pages/TrashProductList';
import ProductView from '../modules/products/ProductView';

const ContentRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Dashboard} />
        <Route exact path={ROUTES.PRODUCT_VIEW} component={ProductView} />
        <Route exact path={ROUTES.TRASH} component={TrashProductList} />
        <Route path="*" exact component={Error404} />
      </Switch>
    </Fragment>
  );
};

export default ContentRoutes;
