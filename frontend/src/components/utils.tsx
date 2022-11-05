import ReactDOM from "react-dom";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function swapView(element: any) {
  ReactDOM.render(element, document.getElementById("view"));
}
