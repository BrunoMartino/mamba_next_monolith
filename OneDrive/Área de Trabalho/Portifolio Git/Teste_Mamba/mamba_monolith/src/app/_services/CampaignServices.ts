import { Campaign, Status } from "@prisma/client";
import { db } from "../_libs/prisma";
import {
  createCampaignSchema,
  updateCampaignSchema,
} from "../_libs/validation";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const getAllCampaigns = async () => {
  return await db.campaign.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
    orderBy: {
      dateInsert: "asc",
    },
  });
};

export const singleCampaign = async (id: string) => {
  return await db.campaign.findUnique({
    where: { id, deletedAt: null },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
  });
};

export const createCampaign = async (data: Campaign) => {
  const validatedData = createCampaignSchema.parse(data);

  const campaign = db.campaign.create({
    data: {
      id: nanoid(8),
      ...validatedData,
    },
    select: {
      name: true,
      description: true,
      status: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
  });

  return campaign;
};

export const updateCampaign = async (id: string, data: Campaign) => {
  const validatedData = updateCampaignSchema.parse(data);

  const currentCampaign = await db.campaign.findUnique({
    where: { id, deletedAt: null },
  });
  if (!currentCampaign) {
    throw new Error("Campanha não Encontrada");
  }

  if (
    validatedData.dateEnd &&
    validatedData.dateInitial &&
    validatedData.dateEnd <= validatedData.dateInitial
  ) {
    throw new Error(
      "A data de expiração precisa ser maior que a data de início"
    );
  }
  const updatedCampaign = await db.campaign.update({
    where: {
      id,
      deletedAt: null,
    },
    data: validatedData,
    select: {
      name: true,
      description: true,
      status: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
  });
  return updatedCampaign;
};

export const deleteCampaign = async (id: string) => {
  const item = await db.campaign.findUnique({
    where: { id, deletedAt: null },
  });

  if (!item) {
    throw new Error("Campanha não encontrada");
  }

  await db.campaign.update({
    where: { id },
    data: { deletedAt: new Date(), status: "EXPIRADA" },
  });
};

export const updateExpiredCampaigns = async () => {
  const today = new Date();
  const expiredCampaigns = await db.campaign.findMany({
    where: {
      dateEnd: { lt: today },
      status: { not: Status.EXPIRADA },
    },
  });

  if (expiredCampaigns.length === 0) {
    console.log("Nenhuma campanha expirou");
    return { updated: 0 };
  }

  await db.campaign.updateMany({
    where: { id: { in: expiredCampaigns.map((c) => c.id) } },
    data: { status: Status.EXPIRADA },
  });

  console.log(`Atualizadas ${expiredCampaigns.length} campanhas para EXPIRADA`);
  return { updated: expiredCampaigns.length };
};

export const searchCampaigns = async (searchTerm: string) => {
  return await db.campaign.findMany({
    where: {
      deletedAt: null,
      OR: [
        { id: { contains: searchTerm } },
        { name: { contains: searchTerm } },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
    orderBy: {
      dateInsert: "asc",
    },
  });
};
