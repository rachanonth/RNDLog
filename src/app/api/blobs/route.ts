import { list, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  const { blobs } = await list();
  return NextResponse.json(blobs);
}

export async function DELETE(req: Request) {
  const { url } = await req.json();
  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }
  await del(url);
  return NextResponse.json({ deleted: true });
}
