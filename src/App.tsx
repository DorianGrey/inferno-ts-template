import {render, version} from "inferno";
import Component from "inferno-component";

const container = document.getElementById("app");

class App extends Component<any, any> {
  private tsxVersion: string;

  constructor(props: any, context: any) {
    super(props, context);

    this.tsxVersion = "2.1.6";
  }

  render() {
    return (
      <div>
        <h1>{`Welcome to Inferno ${version} TSX ${this.tsxVersion}`}</h1>
      </div>
    );
  }
}

render(<App />, container);