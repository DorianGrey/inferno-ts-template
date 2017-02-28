import "./App.scss";

import {Props} from "inferno";
import {Link} from "inferno-router";
import Component from "inferno-component";
import {translate} from "./translate";

export class App extends Component<any, any> {

  constructor(props: Props, context: any) {
    super(props, context);
  }

  render() {
    return (
      <div className="navigation">
        <h1>{translate("app.title")}</h1>
        <nav>
          <Link to="/input-test" activeClassName="active">{translate("app.links.inputTest")}</Link>
          <Link to="/todos" activeClassName="active">{translate("app.links.todo")}</Link>
          <Link to="/lazy-test" activeClassName="active">{translate("app.links.lazyTest")}</Link>
        </nav>
        <div className="page-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
