export async function getData(): Promise<Todo[] | []> {
  const { data }: { data: Todo[] } = await fetch("http://localhost:3000/api/todos", { cache: "no-store" }).then(res => res.json())
  return data;
}