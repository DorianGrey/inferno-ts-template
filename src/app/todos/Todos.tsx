import {Props} from "inferno";

import {Translate} from "../i18n/Translate";
import {TodoStoreProps, Todo} from "../stores/todos.store";
import Component from "inferno-component";
import {connect} from "inferno-mobx/";

@connect(["todoStore"])
export class Todos extends Component<any, any> {
  constructor(props: Props & TodoStoreProps, context: any) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Translate entry="todos.heading"/>
        <ul>
          { this.props.todoStore.todos.map((todo: Todo) => <li>{ todo.text }</li>) }
        </ul>
        <form action="" onSubmit={ this.addTodo.bind(this) }>
          <input type="text" required/>
          <button type="submit"><Translate entry="general.add"/></button>
        </form>
      </div>
    );
  }

  addTodo(event: Event): void {
    event.preventDefault();
    const newTodoName = event.target[0].value;
    this.props.todoStore.todos.push({text: newTodoName});
    event.target[0].value = "";
  }
}