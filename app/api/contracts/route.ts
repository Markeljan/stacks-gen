import { getAllContracts } from "@/lib/db/redis";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filter = searchParams.get("filter")?.toLowerCase() || "";

  const allContracts = await getAllContracts();
  const filteredContracts = filter
    ? allContracts.filter((contract) =>
        contract.address.toLowerCase().includes(filter)
      )
    : allContracts;

  return NextResponse.json({ contracts: filteredContracts });
}
