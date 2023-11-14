import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import fsPromises from "fs/promises";
import { format } from "date-fns";

// file path to dummy data
const filePath = __dirname.split(".next")[0] + "/public/data.json";

export async function GET() {
  // read data from json file
  const data = await fsPromises.readFile(filePath, "utf-8");
  // parse json to string
  const jsonData = JSON.parse(data);

  return NextResponse.json({ data: jsonData });
}

export async function POST(req: NextRequest) {
  const { todo } = await req.json();
  if (!todo || todo.trim() === "")
    return NextResponse.json({ message: "Todo is required" });
  // read old todo
  const oldData = JSON.parse(await fsPromises.readFile(filePath, "utf-8"));
  // create new todo
  const newTodo = {
    id: v4(),
    todo: todo.trim(),
    isCompleted: false,
    createdAt: format(new Date(), "dd/MM/yyyy HH:MM:ss"),
  };
  // push newtodo to old todo list
  oldData.push(newTodo);
  // write new todo
  await fsPromises.writeFile(filePath, JSON.stringify(oldData));
  return NextResponse.json({ newTodo }, { status: 201 });
}
