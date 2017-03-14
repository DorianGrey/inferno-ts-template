import "./styles/main.scss";

import {render} from "inferno";
import {Provider} from "inferno-mobx";

import {bootloader} from "./bootloader";

import {I18nProvider} from "./app/i18n/i18nProvider";
import {routes} from "./app/Routes";

import {i18nStore} from "./app/stores/i18n.store";
import {todoStore} from "./app/stores/todos.store";
import {tabViewedStore} from "./app/stores/tabViewed.store";

function main() {
  if (process.env.NODE_ENV !== "production") {
    require("inferno-devtools");
  }
  const container = document.getElementById("app");
  if (container != null) {
    // Clear placeholding content.
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    render(
      <Provider i18nStore={ i18nStore } todoStore={ todoStore } tabViewedStore={ tabViewedStore } >
        <I18nProvider>
          {routes}
        </I18nProvider>
      </Provider>,
      container
    );
  } else {
    throw Error("Application anchor could not be found, aborting...");
  }
}

bootloader(main);

