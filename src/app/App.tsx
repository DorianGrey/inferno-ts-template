import "./App.scss";

import {Props} from "inferno";
import {Link} from "inferno-router";
import Component from "inferno-component";

export class App extends Component<any, any> {

  constructor(props: Props, context: any) {
    super(props, context);
  }

  render() {
    return (
      <div className="navigation">
        <h1>{`Demo application`}</h1>
        <nav>
          <Link to="/input-test" activeClassName="active">Input test</Link>
          <Link to="/todos" activeClassName="active">Todo list</Link>
          <Link to="/lazy-test" activeClassName="active">Lazy loading test</Link>
        </nav>
        <div className="page-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
