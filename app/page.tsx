import AddTodo from "./components/addTodo";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <AddTodo />
    </div>
  )
}
