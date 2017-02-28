import "./InputTest.scss";

import Component from "inferno-component";
import {Props} from "inferno";
import {TranslateProviderContext} from "../translateProvider/TranslateProvider";

interface InputTestState {
  text: string;
}

export class InputTest extends Component<any, any & TranslateProviderContext> {
  state: InputTestState = {text: ""};

  constructor(props: Props, context: any & TranslateProviderContext) {
    super(props, context);
  }

  render() {
    // Since `onChange` only reliably triggers on `focus` and `blur`, its unlikely in our case.
    // Both `onKeyDown` and `onKeyUp` have some disadvantages regarding performance and trigger time.
    // TODO: Try to figure out which one is preferable.

    // We're replacing the spaces to properly display them in the markup, but leave the model untouched.
    const typedText = this.state.text.replace(/\s/g, "&nbsp;");

    return (
      <div className="input-test-component">
        <h3>{this.context.translate("inputTest.heading")}</h3>
        <div dangerouslySetInnerHTML={{__html: this.context.translate("inputTest.display", {value: typedText})}}></div>
        <input type="text" onKeyUp={ this.updateDisplayedText.bind(this) }/>
      </div>
    );
  }

  private updateDisplayedText(event: Event): void {
    this.setState({
      text: (event.target as HTMLInputElement).value
    });
  }

}