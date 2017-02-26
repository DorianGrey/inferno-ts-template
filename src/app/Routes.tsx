import {IndexRoute, Redirect, Router, Route} from "inferno-router";
import Component from "inferno-component";
import createBrowserHistory from "history/createBrowserHistory";

import {App} from "./App";
import {NotFound} from "./404/404";
import {InputTestComponent} from "./inputTest/InputTestComponent";
import {TodosComponent} from "./todos/TodosComponent";

const browserHistory = createBrowserHistory();

function loadLazyComponent(_nextState: any, callback: (error: any, comp: Component<any, any>) => void): void {
  require.ensure(["./lazy/LazyComponent"], function (require) {
    const comp = require<any>("./lazy/LazyComponent").LazyComponent;
    callback(null, comp);
  });
}

export const routes = (
  <Router history={ browserHistory }>
    <IndexRoute component={ App }>
      <Redirect from="/" to="/input-test" />
      <Route path="input-test" component={ InputTestComponent }/>
      <Route path="todos" component={ TodosComponent }/>
      <Route path="lazy-test" getComponent={ loadLazyComponent }/>
      <Route path="*" component={ NotFound }/>
    </IndexRoute>
  </Router>
);