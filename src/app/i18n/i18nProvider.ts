import Component from "inferno-component";
import {Props} from "inferno";
import {connect} from "inferno-mobx";

import get from "lodash-es/get";
import template from "lodash-es/template";

import messages from "../../generated/translations";
import {I18nStoreProps} from "../stores/i18n.store";
import {autorun} from "mobx";

export interface I18nProviderContext {
  translate(key: string, values?: {[key: string]: any}): string;
}

@connect(["i18nStore"])
export class I18nProvider extends Component<any, any> {

  static getAvailableLanguages(): string[] {
    return Object.keys(messages);
  }

  currentTranslations: {[key: string]: string};

  initialized: boolean = false;

  constructor(props?: Props & I18nStoreProps, context?: any) {
    super(props, context);

    this.updateLanguage(this.props.i18nStore.currentLang);

    autorun(() => this.updateLanguage(this.props.i18nStore.currentLang));
  }

  shouldComponentUpdate(nextProps: Props & I18nStoreProps): boolean {
    return nextProps.i18nStore.currentLang !== this.props.i18nStore.currentLang;
  }

  render() {
    return this.props.children;
  }

  getChildContext() {
    return {
      translate:      this.translate.bind(this),
      formatNumber:   this.formatNumber.bind(this),
      formatDateTime: this.formatDateTime.bind(this)
    };
  }

  translate(key: string, values: {[key: string]: any} = {}): string {
    const potTranslation = get(this.currentTranslations, key) as string;
    if (!potTranslation) {
      return key;
    } else {
      const compiled = template(potTranslation, {interpolate: /{{([\s\S]+?)}}/g});
      return compiled(values);
    }
  }

  // TODO: Maybe offer a simpler way to format numbers.
  formatNumber(src: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.props.i18nStore.currentLang, options).format(src);
  }

  // TODO: Maybe offer a simpler way to format dates.
  formatDateTime(src: Date | number, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.props.i18nStore.currentLang, options).format(src);
  }

  private updateLanguage(newLang: string): void {
    this.props.i18nStore.currentLang = newLang;
    this.currentTranslations         = messages[this.props.i18nStore.currentLang];
    // TODO: We need to call for a re-render of all relevant children ... but how?
    if (!this.initialized) {
      this.initialized = true;
    } else {
      setTimeout(() => {
        this.forceUpdate();
      });
    }
  }
}