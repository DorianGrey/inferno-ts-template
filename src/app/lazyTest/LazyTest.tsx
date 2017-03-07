import "./LazyTest.scss";

import Component from "inferno-component";
import {Props} from "inferno";
import {I18nProviderContext} from "../i18n/i18nProvider";
import {Translate} from "../i18n/Translate";

interface LazyTestState {
  seconds: number;
}

export class LazyTest extends Component<any, any & I18nProviderContext> {
  state: LazyTestState = {seconds: 0};

  pendingInterval: number;

  constructor(props: Props, context: any & I18nProviderContext) {
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