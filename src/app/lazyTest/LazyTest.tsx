import "./LazyTest.scss";

import Component from "inferno-component";
import {Props} from "inferno";
import {connect} from "inferno-mobx";

import {I18nProviderContext} from "../i18n/i18nProvider";
import {Translate} from "../i18n/Translate";
import {TabViewedStoreProps} from "../stores/tabViewed.store";

interface LazyTestState {
  seconds: number;
}

@connect(["tabViewedStore"])
export class LazyTest extends Component<any, any & I18nProviderContext> {
  state: LazyTestState = {seconds: 0};

  pendingInterval: number;

  constructor(props: Props & TabViewedStoreProps, context: any & I18nProviderContext) {
    super(props, context);
  }

  componentWillMount(): void {
    this.pendingInterval = setInterval(() => {
      this.props.tabViewedStore.lazyTest = this.props.tabViewedStore.lazyTest + 1;
    }, 1000 as any);
  }

  componentWillUnmount(): void {
    clearInterval(this.pendingInterval);
  }

  render() {
    return (
      <div className="lazy-component">
        <p><Translate entry="lazyTest.text"/></p>
        <p><Translate entry="lazyTest.info" bindings={ {value: this.props.tabViewedStore.lazyTest} }/></p>
      </div>
    );
  }
}