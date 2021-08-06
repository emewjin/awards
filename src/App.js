import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Hair from "./views/Hair";
import Eye from "./views/Eye";
import Cloth from "./views/Cloth";
import Pet from "./views/Pet";
import Info from "./views/Info";
import Search from "./views/Search";

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
