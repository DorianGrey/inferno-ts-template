import { IndexRoute, Router, Route } from "inferno-router";
import createBrowserHistory from "history/createBrowserHistory";

import {App} from "./App";
import {NotFound} from "./404/404";
import {TestComponent} from "./test1/TestComponent";
import {TestComponent2} from "./test2/TestComponent2";

const browserHistory = createBrowserHistory();

export const routes = (
  <Router history={ browserHistory }>
    <IndexRoute component={ App }>
      <IndexRoute component={ TestComponent } />
      <Route path="todos" component={ TestComponent2 } />
      <Route path="*" component={ NotFound }/>
    </IndexRoute>
  </Router>
);