import "./App.scss";

import {Props} from "inferno";
import {Link} from "inferno-router";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import indexOf from "lodash-es/indexOf";

import {I18nProviderContext} from "./i18n/i18nProvider";
import {Translate} from "./i18n/Translate";
import {FormatDateTime} from "./i18n/FormatDateTime";

import {I18nStoreProps} from "./stores/i18n.store";

@connect(["i18nStore"])
export class App extends Component<any, any & I18nProviderContext> {

  state: {
    date: Date;
  };

  pendingInterval: number;

  constructor(props: Props & I18nStoreProps, context: any & I18nProviderContext) {
    super(props, context);
  }

  componentWillMount(): void {
    this.pendingInterval = setInterval(() => this.setState({date: new Date()}), 1000 as any);
  }

  componentWillUnmount(): void {
    clearInterval(this.pendingInterval);
  }

  render() {
    return (
      <div className="navigation">
        <h1><Translate entry="app.title"/></h1>
        <h2><FormatDateTime entry={ this.state.date } /></h2>
        <span className="language-select" onClick={ this.rotateLanguage.bind(this) }>{ this.props.i18nStore.currentLang }</span>
        <nav>
          <Link to="/input-test" activeClassName="active"><Translate entry="app.links.inputTest"/></Link>
          <Link to="/todos" activeClassName="active"><Translate entry="app.links.todo"/></Link>
          <Link to="/lazy-test" activeClassName="active"><Translate entry="app.links.lazyTest"/></Link>
        </nav>
        <div className="page-body">
          {this.props.children}
        </div>
      </div>
    );
  }

    rotateLanguage(): void {
    const idx = (indexOf(this.props.i18nStore.availableLangs, this.props.i18nStore.currentLang) + 1) % this.props.i18nStore.availableLangs.length;
    this.props.i18nStore.currentLang = this.props.i18nStore.availableLangs[idx];
  }
}
