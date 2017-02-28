import get from "lodash-es/get";
import template from "lodash-es/template";

import messages from "../generated/translations";

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
    const compiled = template(potTranslation, {interpolate: /{{([\s\S]+?)}}/g});
    return compiled(values);
  }
}