import "./styles/main.scss";

import {render} from "inferno";
import {Provider} from "inferno-mobx";

import {bootloader} from "./bootloader";
import {Main} from "./app/Main";

import {i18nStore} from "./app/stores/i18n.store";
import {todoStore} from "./app/stores/todos.store";
import {tabViewedStore} from "./app/stores/tabViewed.store";

function main() {
  if (process.env.NODE_ENV !== "production") {
    require("inferno-devtools");
  }
  const container = document.getElementById("app");
  // Clear placeholding content.
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  render(
    <Provider i18nStore={ i18nStore } todoStore={ todoStore } tabViewedStore={ tabViewedStore } >
      <Main />
    </Provider>,
    container
  );
}

bootloader(main);

