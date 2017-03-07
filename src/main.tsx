import "./styles/main.scss";

import {render} from "inferno";

import {bootloader} from "./bootloader";
import {routes} from "./app/Routes";
import {TranslateProvider} from "./app/i18n/i18nProvider";


function Main() {
  if (process.env.NODE_ENV !== "production") {
    require("inferno-devtools");
  }
  const container = document.getElementById("app");
  // Clear placeholding content.
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  render(
    <TranslateProvider language="en">
      {routes}
    </TranslateProvider>,
    container
  );
}

bootloader(Main);

