import {get, template, templateSettings} from "lodash";
import messages from "../generated/translations";

templateSettings.interpolate = /{{([\s\S]+?)}}/g;

let currentLang         = "en";
let currentTranslations = messages[currentLang];

export function setCurrentLang(key: "en" | "de"): void {
  currentLang         = key;
  currentTranslations = messages[currentLang];
}

export function translate(key: string, values: {[key: string]: any} = {}): string {
  const potTranslation = get(currentTranslations, key) as string;
  if (!potTranslation) {
    return key;
  } else {
    const compiled = template(potTranslation);
    return compiled(values);
  }
}