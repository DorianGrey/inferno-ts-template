import Component from "inferno-component";
import {Props} from "inferno";

import {TranslateProvider} from "./i18n/i18nProvider";
import indexOf from "lodash-es/indexOf";
import {routes} from "./Routes";

export class Main extends Component<any, any> {

  state: {
    language: string;
  } = {language: "en"};

  readonly availableLangs = TranslateProvider.getAvailableLanguages();

  constructor(props: Props, context: any) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <span className="language-select" onClick={ this.rotateLanguage.bind(this) }>{ this.state.language }</span>
        <TranslateProvider language={ this.state.language }>
          {routes}
        </TranslateProvider>
      </div>
    );
  }

  rotateLanguage(): void {
    const idx = (indexOf(this.availableLangs, this.state.language) + 1) % this.availableLangs.length;
    this.setState({
      language: this.availableLangs[idx]
    });
  }
}