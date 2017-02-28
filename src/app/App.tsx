import "./App.scss";

import {Props} from "inferno";
import {Link} from "inferno-router";
import Component from "inferno-component";

import {TranslateProviderContext} from "./translateProvider/TranslateProvider";

export class App extends Component<any, any & TranslateProviderContext> {

  constructor(props: Props, context: any & TranslateProviderContext) {
    super(props, context);
  }

  render() {
    return (
      <div className="navigation">
        <h1>{this.context.translate("app.title")}</h1>
        <nav>
          <Link to="/input-test" activeClassName="active">{this.context.translate("app.links.inputTest")}</Link>
          <Link to="/todos" activeClassName="active">{this.context.translate("app.links.todo")}</Link>
          <Link to="/lazy-test" activeClassName="active">{this.context.translate("app.links.lazyTest")}</Link>
        </nav>
        <div className="page-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
