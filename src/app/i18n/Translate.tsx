import {I18nProviderContext} from "./i18nProvider";
import {Props} from "inferno";

export interface TranslateProps {
  entry: string;
  bindings?: {}
}

export function Translate(props: Props & TranslateProps, context: any & I18nProviderContext) {
  const {entry, bindings} = props;

  return (
    context.translate(entry, bindings)
  );
}