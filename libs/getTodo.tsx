export default async function getTodo(id: string): Promise<Todo | null> {
  const { data }: { data: Todo } = await fetch(`http://localhost:3000/api/todos/${id}`).then(res => res.json())
  return data
}