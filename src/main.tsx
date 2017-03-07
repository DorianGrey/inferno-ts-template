import "./styles/main.scss";

import {render} from "inferno";

import {bootloader} from "./bootloader";
import {Main} from "./app/Main";

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
    <Main />,
    container
  );
}

bootloader(main);

