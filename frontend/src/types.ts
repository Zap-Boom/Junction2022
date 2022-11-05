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
}

export interface TDList {
  list: Item[];
}
