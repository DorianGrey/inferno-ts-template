import {TranslateProviderContext} from "../translateProvider/TranslateProvider";

export function Todos(_props: any, context: any & TranslateProviderContext) {
  return (
    <div>
      {context.translate("todos.heading")}
    </div>
  );
}