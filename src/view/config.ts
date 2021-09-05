export interface todo {
  status: string;
  name: string;
  index?: string;
}
export interface todoliststate {
  todoList: todo[];
  done: number;
}
