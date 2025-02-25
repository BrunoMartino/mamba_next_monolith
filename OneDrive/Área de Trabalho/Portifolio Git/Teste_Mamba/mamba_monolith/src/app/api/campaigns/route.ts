import * as CampaignServices from "@/app/_services/CampaignServices";
import { createCampaignSchema } from "@/app/_libs/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const category = searchParams.get("category") || undefined;

    const campaigns = await CampaignServices.getAllCampaigns({
      status,
      category,
    });
    return NextResponse.json(campaigns, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "erro ao buscar campanhas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = createCampaignSchema.parse(data);
    const createdCampaign = await CampaignServices.createCampaign(
      validatedData
    );
    return NextResponse.json(createdCampaign, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Erro ao criar campanha" },
      { status: 400 }
    );
  }
}
