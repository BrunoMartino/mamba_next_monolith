import { updateExpiredCampaigns } from "@/app/_services/CampaignServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const result = await updateExpiredCampaigns();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("falha em atualizar status das camapanhas", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
