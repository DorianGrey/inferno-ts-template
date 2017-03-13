import {observable} from "mobx";


export interface Todo {
  text: string;
  done?: boolean;
}

export interface TodoStoreProps {
  todoStore: {
    todos: Todo[];
  };
}

export let todoStore = observable({
  todos: []
});