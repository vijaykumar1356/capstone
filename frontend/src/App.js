import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Products from "./pages/Products";

import Cart from "./pages/Cart";
import ProductDatails from "./pages/ProductDatails";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import Activate from "./pages/Activate";

import { Provider } from "react-redux";
import store from "./store";

import Layout from "./hocs/Layout";

import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import rating from "./pages/rating";
import Account from './pages/Account';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          {/* <Navbar /> */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/account" exact component={Account} />
            <Route path="/reports" component={Reports} />
            <Route path="/products/:category" component={Products} />
            
            <Route path="/cart" component={Cart} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/productdetails/:id" component={ProductDatails} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/rating/:product_id" component={rating} />

            <Route exact path="/reset_password" component={ResetPassword} />
            <Route
              exact
              path="/password/reset/confirm/:uid/:token"
              component={ResetPasswordConfirm}
            />
            <Route exact path="/activate/:uid/:token" component={Activate} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
