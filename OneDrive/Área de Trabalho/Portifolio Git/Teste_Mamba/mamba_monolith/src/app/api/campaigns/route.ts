import { NextResponse } from "next/server";
import * as CampaignServices from "@/app/services/CampaignServices";
import { createCampaignSchema } from "@/app/libs/validation";

export const GET = async () => {
  try {
    const campaigns = await CampaignServices.getAllCampaigns();
    return NextResponse.json(campaigns, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "erro ao buscar campanhas" },
      { status: 500 }
    );
  }
};

export const GET_ID = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const campaign = await CampaignServices.singleCampaign(params.id);
  if (!campaign) {
    return NextResponse.json(
      { message: "Campanha não encontrada ou deletada" },
      { status: 404 }
    );
  }

  return NextResponse.json(campaign);
};

export const POST = async (req: Request) => {
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
};
