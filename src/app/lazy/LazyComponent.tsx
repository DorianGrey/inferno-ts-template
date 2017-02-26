import "./LazyComponent.scss";

import Component from "inferno-component";
import {Props} from "inferno";

interface LazyComponentState {
  seconds: number;
}

export class LazyComponent extends Component<any, any> {
  state: LazyComponentState = {seconds: 0};

  pendingInterval: number;

  constructor(props: Props, context: any) {
    super(props, context);
  }

  componentWillMount(): void {
    this.pendingInterval = setInterval(() => this.setState({seconds: this.state.seconds + 1}), 1000 as any);
  }

  componentWillUnmount(): void {
    clearInterval(this.pendingInterval);
  }

  render() {
    return (
      <div className="lazy-component">
        <p>This is a lazily loaded test component.</p>
        <p>You have been watching this component for {this.state.seconds} seconds.</p>
      </div>
    );
  }
}