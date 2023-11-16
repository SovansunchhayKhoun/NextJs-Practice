type SubTasks = {
  _id?: string;
  todo: string;
  isCompleted: boolean;
};

type Todo = {
  _id?: string;
  todo: string;
  isCompleted?: boolean;
  createdAt?: Date;
  subTasks: SubTasks[] | [];
};

type TodoError = {
  message: string;
};
