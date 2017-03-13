import Component from "inferno-component";
import {Props} from "inferno";
import {connect} from "inferno-mobx";

import {I18nProvider} from "./i18n/i18nProvider";
import indexOf from "lodash-es/indexOf";
import {routes} from "./Routes";
import {I18nStoreProps} from "./stores/i18n.store";

@connect(["i18nStore"])
export class Main extends Component<any, any> {

  constructor(props: Props & I18nStoreProps, context: any) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <span className="language-select" onClick={ this.rotateLanguage.bind(this) }>{ this.props.i18nStore.currentLang }</span>
        <I18nProvider>
          {routes}
        </I18nProvider>
      </div>
    );
  }

  rotateLanguage(): void {
    const idx = (indexOf(this.props.i18nStore.availableLangs, this.props.i18nStore.currentLang) + 1) % this.props.i18nStore.availableLangs.length;
    this.props.i18nStore.currentLang = this.props.i18nStore.availableLangs[idx];
  }
}