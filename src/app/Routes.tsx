import {IndexRoute, Redirect, Router, Route} from "inferno-router";
import Component from "inferno-component";
import createBrowserHistory from "history/createBrowserHistory";

import {App} from "./App";
import {NotFound} from "./404/404";
import {InputTest} from "./inputTest/InputTest";
import {Todos} from "./todos/Todos";

const browserHistory = createBrowserHistory();

function loadLazyComponent(_nextState: any, callback: (error: any, comp: Component<any, any>) => void): void {
  require.ensure(["./lazyTest/LazyTest"], function (require) {
    const comp = require<any>("./lazyTest/LazyTest").LazyTest;
    callback(null, comp);
  });
}

export const routes = (
  <Router history={ browserHistory }>
    <IndexRoute component={ App }>
      <Redirect from="/" to="/input-test" />
      <Route path="input-test" component={ InputTest }/>
      <Route path="todos" component={ Todos }/>
      <Route path="lazy-test" getComponent={ loadLazyComponent }/>
      <Route path="*" component={ NotFound }/>
    </IndexRoute>
  </Router>
);