// app/api/store/products/[id]/route.js

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.eventproduct.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to delete product." },
      { status: 500 }
    );
  }
}
