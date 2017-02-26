import "./InputTestComponent.scss";

import Component from "inferno-component";
import {Props} from "inferno";

interface InputTestComponentState {
  text: string;
}

export class InputTestComponent extends Component<any, any> {
  state: InputTestComponentState = {text: ""};

  constructor(props: Props, context: any) {
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
        <h3>Input test component</h3>
        <div>You typed <span className="display" dangerouslySetInnerHTML={{__html: typedText}}/></div>
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