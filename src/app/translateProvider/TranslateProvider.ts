import Component from "inferno-component";
import {Props} from "inferno";

import get from "lodash-es/get";
import template from "lodash-es/template";

import messages from "../../generated/translations";

interface TranslateProviderProps {
  language: string;
}

export interface TranslateProviderContext {
  translate(key: string, values?: {[key: string]: any}): string;
}

export class TranslateProvider extends Component<any, any> {

  currentLang: string = "en";
  currentTranslations: {[key: string]: string};

  constructor(props?: Props & TranslateProviderProps, context?: any) {
    super(props, context);

    this.currentLang         = this.props.language;
    this.currentTranslations = messages[this.currentLang];
  }

  render() {
    return this.props.children;
  }

  getChildContext() {
    return {
      translate: this.translate.bind(this)
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
}