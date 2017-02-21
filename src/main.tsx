import {render} from "inferno";
import {App} from "./app/App";
import {bootloader} from "./bootloader";

function Main() {
  const container = document.getElementById("app");
  render(<App />, container);
}

bootloader(Main);

