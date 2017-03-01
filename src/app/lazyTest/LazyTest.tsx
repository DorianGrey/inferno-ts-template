import "./LazyTest.scss";

import Component from "inferno-component";
import {Props} from "inferno";
import {TranslateProviderContext} from "../translateProvider/TranslateProvider";
import {Translate} from "../translateProvider/Translate";

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
        <p><Translate entry="lazyTest.text"/></p>
        <p><Translate entry="lazyTest.info" bindings={ {value: this.state.seconds} }/></p>
      </div>
    );
  }
}