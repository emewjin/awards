import React, { createContext, useContext, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Hair from "./views/Hair";
import Eye from "./views/Eye";
import Cloth from "./views/Cloth";
import Pet from "./views/Pet";
import Info from "./views/Info";
import Search from "./views/Search";
import Wish from "./views/Wish";

const WishIdContext = createContext();
export const useWishIdContext = () => useContext(WishIdContext);
const { Provider } = WishIdContext;

function App() {
  const [wishIds, setWishIds] = useState([]);

  return (
    <Router>
      <Nav />
      <Switch>
        <Provider value={{ wishIds, setWishIds }}>
          <Route exact path="/" component={Hair} />
          <Route exact path="/eye" component={Eye} />
          <Route exact path="/cloth" component={Cloth} />
          <Route exact path="/pet" component={Pet} />
          <Route exact path="/wish" component={Wish} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/info" component={Info} />
        </Provider>
      </Switch>
    </Router>
  );
}

export default App;
