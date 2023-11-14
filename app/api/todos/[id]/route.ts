import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";

type Props = {
  params: {
    id: string;
  };
};

// file path to dummy data
const FILEPATH = __dirname.split(".next")[0] + "/public/data.json";

export async function GET(_req: NextRequest, { params }: Props) {
  try {
    console.log(params)
    const { id } = params;
    // read data from json file
    const data = await fsPromises.readFile(FILEPATH, "utf-8");
    // parse json to string
    const jsonData = JSON.parse(data);

    if (!id)
      return NextResponse.json({ message: "ID not found." }, { status: 404 });

    const result = jsonData.find((data: Todo) => data.id === id);
    console.log(result)
    if (!result)
      return NextResponse.json({ data: `${id} not found.` }, { status: 404 });

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Unexpected error", err },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    if (!params.id) return NextResponse.json({ message: "ID not found." });
    const { id } = params;
    const { todo } = await req.json();

    if (!todo || todo.trim() === "")
      return NextResponse.json(
        { message: "Todo cannot be empty" },
        { status: 400 }
      );

    const data = await fsPromises.readFile(FILEPATH, "utf-8");
    const todos = JSON.parse(data);

    const filteredTodos = todos.filter((data: Todo) => data.id !== id);
    const result: Todo = todos.find((todo: Todo) => todo.id === id);

    result.todo = todo.trim();
    console.log(result);

    filteredTodos.push(result);
    console.log(filteredTodos);
    await fsPromises.writeFile(FILEPATH, JSON.stringify(filteredTodos));

    return NextResponse.json({ result });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Unexpected error", err },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  try {
    if (!params.id) return NextResponse.json({ message: "ID not found." });
    const { id } = params;

    const data = await fsPromises.readFile(FILEPATH, "utf-8");
    const todos = JSON.parse(data);

    const filteredTodos = todos.filter((data: Todo) => data.id !== id);

    const result = todos.filter((todo: Todo) => todo.id === id);
    if (!result)
      return NextResponse.json({
        message: `Successfully deleted todo: ${id}`,
        filteredTodos,
      });

    console.log(filteredTodos);
    await fsPromises.writeFile(FILEPATH, JSON.stringify(filteredTodos));

    return NextResponse.json({
      message: `Successfully deleted todo: ${id}`,
      filteredTodos,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Unexpected error", err },
      { status: 400 }
    );
  }
}
