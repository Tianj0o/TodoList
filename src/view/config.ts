export interface todo {
  status: string;
  name: string;
}
export interface todoliststate {
  todoList: todo[];
  done: number;
}
