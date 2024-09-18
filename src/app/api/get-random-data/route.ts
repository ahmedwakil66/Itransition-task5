import getRandomData from "@/faker";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const seed = Number(searchParams.get("seed")) || undefined;
  const quantity = Number(searchParams.get("quantity")) || undefined;
  const offset = Number(searchParams.get("offset")) || undefined;
  const local = searchParams.get("local") || undefined;
  const error = Number(searchParams.get("error")) || 0;

  try {
    const data = getRandomData(seed, quantity, offset, local, error);
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};
