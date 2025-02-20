import * as react_mod from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

import { ServerConnection } from "./server_connection/server_connection.js";

import { LandingPage } from "./routes/r0_landing/landing.jsx";
import { DemographicPage } from "./routes/r1_demographic/demographic.jsx";
import { PlayerPage } from "./routes/r2_player/player.jsx";

export const ServerConnectionContext =
  react_mod.createContext(ServerConnection);

export function App() {
  let global = window.action_lab;
  if (global == undefined) {
    global = {};
    window.action_lab = global;
  }

  global.server_connection = new ServerConnection();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/demographic" component={DemographicPage} />
        <Route exact path="/player/:player_id" component={PlayerPage} />
      </Switch>
    </Router>
  );
}
