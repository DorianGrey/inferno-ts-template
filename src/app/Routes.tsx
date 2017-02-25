import {IndexRoute, Router, Route} from "inferno-router";
import Component from "inferno-component";
import createBrowserHistory from "history/createBrowserHistory";

import {App} from "./App";
import {NotFound} from "./404/404";
import {TestComponent} from "./test1/TestComponent";
import {TestComponent2} from "./test2/TestComponent2";

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
      <IndexRoute component={ TestComponent }/>
      <Route path="todos" component={ TestComponent2 }/>
      <Route path="lazy" getComponent={ loadLazyComponent }/>
      <Route path="*" component={ NotFound }/>
    </IndexRoute>
  </Router>
);