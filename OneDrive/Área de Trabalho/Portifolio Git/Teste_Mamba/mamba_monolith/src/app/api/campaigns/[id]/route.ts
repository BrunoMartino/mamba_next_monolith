import { NextResponse } from "next/server";
import * as CampaignServices from "@/app/services/CampaignServices";
import { updateCampaignSchema } from "@/app/libs/validation";

export const GET = async (req: Request, ctx: { params: { id: string } }) => {
  const { id } = await ctx.params;
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
};

export const PUT = async (req: Request, ctx: { params: { id: string } }) => {
  const { id } = await ctx.params;

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
};

export const DELETE = async (req: Request, ctx: { params: { id: string } }) => {
  const { id } = await ctx.params;
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
};
