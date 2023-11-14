import AddTodo from "./components/addTodo";
import TodoList from "./components/todo";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <AddTodo />
      {/* <div className="">
        <TodoList />
      </div> */}
    </div>
  )
}
