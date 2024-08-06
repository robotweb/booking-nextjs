// pages/api/user/update.js
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await auth();
  const { email, name } = await req.json();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Update the user info in the database
    const updatedUser = await db.user.update({
      where: { email: session.user.email as string },
      data: { email, name },
    });

    // Return the updated user information
    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
