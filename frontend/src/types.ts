export interface Item {
  duration: number;
  endHour: number;
  endMinute: number;
  isChosen: boolean;
  level: string;
  name: string;
  startHour: number;
  startMinute: number;
  _id: string;
  taskStart: Date;
  taskEnd: Date;
}

export interface TDList {
  list: Item[];
}
