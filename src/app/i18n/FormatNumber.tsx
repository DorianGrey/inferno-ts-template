import {I18nProviderContext} from "./i18nProvider";
import {Props} from "inferno";

export interface FormatNumberProps {
  entry: number;
  options?: Intl.NumberFormatOptions
}

export function FormatNumber(props: Props & FormatNumberProps, context: any & I18nProviderContext) {
  const {entry, options} = props;

  return (
    context.formatNumber(entry, options)
  );
}