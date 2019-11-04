import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/high_order_components/Layout";
import './App.css'

function App() {
  return (
    <div className='App'>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
