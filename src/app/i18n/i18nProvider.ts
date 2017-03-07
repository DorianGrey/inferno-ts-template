import Component from "inferno-component";
import {Props} from "inferno";

import get from "lodash-es/get";
import template from "lodash-es/template";

import messages from "../../generated/translations";

interface I18nProviderProps {
  language: string;
}

export interface I18nProviderContext {
  translate(key: string, values?: {[key: string]: any}): string;
}

export class TranslateProvider extends Component<any, any> {

  state: {
    currentLang: string;
  } = {currentLang: "en"};

  currentTranslations: {[key: string]: string};

  constructor(props?: Props & I18nProviderProps, context?: any) {
    super(props, context);

    this.updateLanguage(this.props.language);
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
    return new Intl.NumberFormat(this.state.currentLang, options).format(src);
  }

  // TODO: Maybe offer a simpler way to format dates.
  formatDateTime(src: Date | number, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.state.currentLang, options).format(src);
  }

  private updateLanguage(newLang: string): void {
    this.state.currentLang   = newLang;
    this.currentTranslations = messages[this.state.currentLang];
  }
}