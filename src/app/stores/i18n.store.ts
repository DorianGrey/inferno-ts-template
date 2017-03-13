import {observable} from "mobx";
import {I18nProvider} from "../i18n/i18nProvider";

export interface I18nStoreProps {
  i18nStore: {
    currentLang: string;
    availableLangs: string[];
  };
}

export let i18nStore = observable({
  currentLang:    "en",
  availableLangs: I18nProvider.getAvailableLanguages()
});