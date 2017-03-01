import {TranslateProviderContext} from "./TranslateProvider";
import {Props} from "inferno";

export interface TranslateProps {
  entry: string;
  bindings?: {}
}

export function Translate(props: Props & TranslateProps, context: any & TranslateProviderContext) {
  const {entry, bindings} = props;

  return (
      context.translate(entry, bindings)
  );
}