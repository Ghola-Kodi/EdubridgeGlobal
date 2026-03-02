import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = await prisma.contactMessage.create({
      data: {
        name:    body.name,
        email:   body.email,
        phone:   body.phone,
        service: body.service,
        message: body.message,
      },
    });
    return NextResponse.json({ success: true, message });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

