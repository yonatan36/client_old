import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Switch from "react";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ProductList} />
      <Route path="/product/:id?" component={ProductForm} />
    </Switch>
  </Router>
);

export default App;
