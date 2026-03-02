import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const isAuth  = !!(session?.user as any)?.id;
  const files   = await prisma.fileResource.findMany({
    where: isAuth ? {} : { isPublic: true },
    orderBy: { uploadedAt: "desc" },
  });
  return NextResponse.json(files);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json();
  const file = await prisma.fileResource.create({ data: body });
  return NextResponse.json(file);
}
