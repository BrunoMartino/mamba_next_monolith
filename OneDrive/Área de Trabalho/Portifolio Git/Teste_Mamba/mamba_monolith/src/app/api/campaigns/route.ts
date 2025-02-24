import * as CampaignServices from "@/app/_services/CampaignServices";
import { createCampaignSchema } from "@/app/_libs/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const campaigns = await CampaignServices.getAllCampaigns();
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
