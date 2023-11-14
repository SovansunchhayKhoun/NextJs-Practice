import getTodo from "@/libs/getTodo";

export default async function Page({ params }: {
  params: {
    id: string
  }
}) {
  const { id } = params;
  const data = await getTodo(id)
  const content = (
    <main>
      {data?.todo}
    </main>
  )
  if (data)
    return content
  return (
    <main>
      No data found
    </main>
  )
}