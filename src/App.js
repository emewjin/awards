import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Hair from "./components/Hair";
import Eye from "./components/Eye";
import Cloth from "./components/Cloth";
import Pet from "./components/Pet";
import Info from "./components/Info";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Hair} />
        <Route exact path="/eye" component={Eye} />
        <Route exact path="/cloth" component={Cloth} />
        <Route exact path="/pet" component={Pet} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/search" component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
