import ReactDOM from "react-dom";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function swapView(element: any) {
  ReactDOM.render(element, document.getElementById("view"));
}

export function mergeData(todos: any, schedule: any) {
  const mergedData = [];
  for (let i = 0; i < todos.length; i++) {
    const match = schedule.filter((task: any) => task.name === todos[i].name);
    if (match.length > 0) {
      mergedData.push(todos[i]);
      mergedData[i].price = match[0].avgkWh;
      mergedData[i].taskStart = match[0].startDate;
      mergedData[i].taskEnd = match[0].endDate;
    } else {
      mergedData.push(todos[i]);
      mergedData[i].warn = true;
    }
  }

  return mergedData;
}
