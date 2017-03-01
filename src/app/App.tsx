import "./App.scss";

import {Props} from "inferno";
import {Link} from "inferno-router";
import Component from "inferno-component";

import {TranslateProviderContext} from "./translateProvider/TranslateProvider";
import {Translate} from "./translateProvider/Translate";

export class App extends Component<any, any & TranslateProviderContext> {

  constructor(props: Props, context: any & TranslateProviderContext) {
    super(props, context);
  }

  render() {
    return (
      <div className="navigation">
        <h1><Translate entry="app.title"/></h1>
        <nav>
          <Link to="/input-test" activeClassName="active"><Translate entry="app.links.inputTest"/></Link>
          <Link to="/todos" activeClassName="active"><Translate entry="app.links.todo"/></Link>
          <Link to="/lazy-test" activeClassName="active"><Translate entry="app.links.lazyTest"/></Link>
        </nav>
        <div className="page-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
