import {I18nProviderContext} from "./i18nProvider";
import {Props} from "inferno";

export interface FormatDateProps {
  entry: Date | number;
  options?: Intl.DateTimeFormatOptions;
}

export function FormatDateTime(props: Props & FormatDateProps, context: any & I18nProviderContext) {
  const {entry, options} = props;

  return (
    context.formatDateTime(entry, options)
  );
}
