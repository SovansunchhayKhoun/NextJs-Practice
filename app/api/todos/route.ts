import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import Todo from "@/model/Todo";

export async function GET() {
  await dbConnect();
  const todos = await Todo.find({});
  return NextResponse.json({ message: "Success", data: todos });
}

export async function POST(req: NextRequest) {
  let errors = [];
  try {
    await dbConnect();
    const { todo } = await req.json();

    // check if todo is valid
    if (!todo || todo.trim() === "") {
      errors.push({ message: "Todo is required!" });
    }

    // check if duplicate todo
    const duplicate = await Todo.findOne({ todo });
    if (duplicate) {
      errors.push({ message: "Todo already exists!" });
    }

    if (errors.length > 0)
      return NextResponse.json({ errors }, { status: 400 });

    // create new todo
    const newTodo = {
      todo: todo.trim(),
      isCompleted: false,
    };

    const res = await Todo.create(newTodo);

    return NextResponse.json({ message: "Success", data: res }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Unexpected error", errors: [err.errors.todo] },
      { status: 400 }
    );
  }
}
