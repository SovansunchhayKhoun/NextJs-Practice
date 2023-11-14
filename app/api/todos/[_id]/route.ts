import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/Todo";
import checkId from "@/libs/checkId";

type Props = {
  params: {
    _id: string;
  };
};

export async function GET(_req: NextRequest, { params }: Props) {
  try {
    const { _id } = params;
    if (!checkId(_id))
      return NextResponse.json({ message: `${_id} is not a valid ID` });
    const todo = await Todo.findOne({ _id }).exec();
    if (!_id)
      return NextResponse.json({ message: "ID not found." }, { status: 404 });

    if (!todo)
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Success", data: todo },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Unexpected error", err },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  let errors = [];
  try {
    // check if id is present or valid
    const { _id } = params;
    if (!checkId(_id))
      errors.push({ message: `${_id} is not a valid ID`, status: 400 });

    if (!_id) errors.push({ message: "ID not found.", status: 404 });

    // Validate todo
    const { todo, isCompleted } = await req.json();
    if (todo?.trim() === "")
      errors.push({ message: "Todo is required!", status: 400 });

    const result = await Todo.findOneAndUpdate(
      { _id },
      { todo, isCompleted },
      { runValidators: true }
    );
    // check if todo exists
    if (!result) errors.push({ message: "Todo does not exist!", status: 404 });

    if (errors.length > 0)
      return NextResponse.json({ errors }, { status: 400 });

    return NextResponse.json(
      { message: "Success", data: result },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "Unexpected error", errors: [err.errors.todo] },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  try {
    const { _id } = params;
    if (!_id) return NextResponse.json({ message: "ID is required!." });

    if (!checkId(_id))
      return NextResponse.json({ message: `${_id} is not a valid ID` });

    await Todo.findByIdAndDelete(_id);

    return NextResponse.json({
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Unexpected error", err },
      { status: 400 }
    );
  }
}
