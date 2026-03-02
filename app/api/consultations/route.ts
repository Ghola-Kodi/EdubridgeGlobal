///app/api/consultations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);
    const consultation = await prisma.consultation.create({
      data: {
        name:     body.name,
        email:    body.email,
        phone:    body.phone,
        service:  body.service,
        founder:  body.founder,
        date:     new Date(body.date),
        timeSlot: body.timeSlot,
        message:  body.message,
        userId:   (session?.user as any)?.id ?? null,
      },
    });
    return NextResponse.json({ success: true, consultation });
  } catch (err) {
    return NextResponse.json({ error: "Failed to book consultation" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!(session?.user as any)?.id) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const role = (session.user as any).role;
  const where = role === "ADMIN" ? {} : { userId: (session.user as any).id };
  const consultations = await prisma.consultation.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(consultations);
}
