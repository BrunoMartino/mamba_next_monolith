import { NextResponse } from "next/server";
import * as CampaignServices from "@/app/_services/CampaignServices";
import { updateCampaignSchema } from "@/app/_libs/validation";

export async function GET(req: Request, param: { params: { id: string } }) {
  const { id } = await param.params;
  try {
    const campaign = await CampaignServices.singleCampaign(id);
    if (!campaign) {
      return NextResponse.json(
        { message: "Campanha não encontrada ou deletada" },
        { status: 404 }
      );
    }
    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Erro ao buscar campanha" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, param: { params: { id: string } }) {
  const { id } = await param.params;

  try {
    const body = await req.json();
    const validatedBody = updateCampaignSchema.parse(body);
    const updatedCampaign = await CampaignServices.updateCampaign(
      id,
      validatedBody
    );
    return NextResponse.json(updatedCampaign, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Erro ao buscar campanha" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, param: { params: { id: string } }) {
  const { id } = await param.params;
  try {
    await CampaignServices.deleteCampaign(id);
    return NextResponse.json(
      { message: "Camapanha deletada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Campanha não encontrada ou ja deletada" },
      { status: 404 }
    );
  }
}
