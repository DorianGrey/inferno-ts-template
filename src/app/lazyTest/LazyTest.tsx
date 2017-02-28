import "./LazyTest.scss";

import Component from "inferno-component";
import {Props} from "inferno";
import {TranslateProviderContext} from "../translateProvider/TranslateProvider";

interface LazyTestState {
  seconds: number;
}

export class LazyTest extends Component<any, any & TranslateProviderContext> {
  state: LazyTestState = {seconds: 0};

  pendingInterval: number;

  constructor(props: Props, context: any & TranslateProviderContext) {
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
        <p>{this.context.translate("lazyTest.text")}</p>
        <p>{this.context.translate("lazyTest.info", {value: this.state.seconds})}</p>
      </div>
    );
  }
}