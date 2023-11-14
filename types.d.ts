type Todo = {
  _id?: string;
  todo: string;
  isCompleted?: boolean;
  createdAt?: Date;
};

type TodoError = {
  message: string
}