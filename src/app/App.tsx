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
          <Link to="/" activeClassName="active">Test 1</Link>
          <Link to="/todos" activeClassName="active">Test 2</Link>
          <Link to="/lazy" activeClassName="active">Lazy test</Link>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
