import "./App.scss";

import {Props} from "inferno";
import {Link} from "inferno-router";
import Component from "inferno-component";

import {I18nProviderContext} from "./i18n/i18nProvider";
import {Translate} from "./i18n/Translate";
import {FormatDateTime} from "./i18n/FormatDateTime";

export class App extends Component<any, any & I18nProviderContext> {

  readonly defaultDateFormat: Intl.DateTimeFormatOptions = {
    hour12: false,
    year:   "numeric",
    month:  "numeric",
    day:    "numeric",
    hour:   "numeric",
    minute: "numeric",
    second: "numeric"
  };

  state: {
    date: Date;
  };

  pendingInterval: number;

  constructor(props: Props, context: any & I18nProviderContext) {
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
        <h2><FormatDateTime entry={ this.state.date } options={ this.defaultDateFormat }/></h2>
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
}
