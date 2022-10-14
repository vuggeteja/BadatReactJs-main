import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import SubCategory from "../Pages/SubCategory";
import VerticleCategory from "../Pages/Verticlecategory";
import ProductDetail from "../Pages/ProductDetail";
import {
  ROUTE_SUBCATEGORIES,
  ROUTE_VERTICLE_CATEGORIES,
  ROUTE_CART,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_ALL_PRODUCT,
  ROUTE_LOGIN,
  ROUTE_USER_DETAIL,
  ROUTE_REGISTER,
} from "../Constant";
import Cart from "../Pages/Cart";
import AllProductPage from "../Pages/AllProductPage";
import AddProduct from '../Pages/AddProduct'
import EditProduct from '../Pages/EditProduct'
import Login from "../Pages/Login";
import UserDetail from "../Pages/UserDetail";
import Profile from "../Pages/Profile"
import Register from "../Pages/Register";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Help from "../Pages/Help";
import EditProfile from "../Pages/EditProfile"
import Order from '../Pages/Order'
import Products from '../Pages/Products'
import Notification from '../Pages/Notification'

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path={`/${ROUTE_SUBCATEGORIES}/:id`}
        component={SubCategory}
      />
      <Route
        exact
        path={`/${ROUTE_VERTICLE_CATEGORIES}/:id`}
        component={VerticleCategory}
      />
      <Route exact path={`/${ROUTE_CART}`} component={Cart} />
      <Route
        exact
        path={`/${ROUTE_PRODUCT_DETAIL}/:id`}
        component={ProductDetail}
      />
      <Route
        exact
        path={`/${ROUTE_ALL_PRODUCT}/:key`}
        component={AllProductPage}
      />
      <Route exact path={`/${ROUTE_LOGIN}`} component={Login} />
      <Route exact path={`/${ROUTE_REGISTER}`} component={Register} />
      <Route exact path={`/${ROUTE_USER_DETAIL}/:id`} component={UserDetail} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/help" component={Help} />
      <Route exact path="/profile" component={EditProfile} />
      <Route exact path="/order" component={Order} />
      <Route exact path="/notification" component={Notification} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/new" component={AddProduct} />
      <Route exact path="/products/edit/:id" component={EditProduct} />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/app" component={() => {window.location.href="http://bit.ly/Badat"; return null;}} />
    </Switch>
  );
};

export default Routes;
