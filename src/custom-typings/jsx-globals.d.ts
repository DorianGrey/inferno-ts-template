import {VNode} from "inferno";

declare global {
  namespace JSX {

    export type Element = string | number | VNode;

    export interface IntrinsicElements {
      [index: string]: any;
    }
  }
}