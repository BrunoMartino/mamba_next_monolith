import { Campaign } from "@prisma/client";

type AddCampaign = {
  type: "addCampaign";
  payload: Campaign;
};
type SetExpiredCampaigns = {
  type: "setExpiredCampaigns";
  payload: Campaign[];
};

type GetAllCampaigns = {
  type: "getAllCampaigns";
  payload: Campaign[];
};
type GetSingleCampaign = {
  type: "getSingleCampaign";
  payload: Campaign;
};
type SearchCampaign = {
  type: "searchCampaign";
  payload: Campaign[];
};
type EditCampaign = {
  type: "editCampaign";
  payload: Campaign;
};
type DeleteCampaign = {
  type: "deleteCampaign";
  payload: {
    id: string;
  };
};

type campaignActions =
  | AddCampaign
  | SetExpiredCampaigns
  | GetAllCampaigns
  | GetSingleCampaign
  | SearchCampaign
  | EditCampaign
  | DeleteCampaign;

interface CampaignState {
  campaigns: Campaign[];
  singleCampaign: Campaign;
}

export const campaignReducer = (
  state: CampaignState,
  action: campaignActions
): CampaignState => {
  switch (action.type) {
    case "addCampaign":
      return { ...state, campaigns: [...state.campaigns, action.payload] };
    case "setExpiredCampaigns":
      return {
        ...state,
        campaigns: state.campaigns.map((campaign) =>
          action.payload.some((exp) => exp.id === campaign.id)
            ? { ...campaign, status: "EXPIRADA" }
            : campaign
        ),
      };
    case "getAllCampaigns":
      return { ...state, campaigns: action.payload };
    case "getSingleCampaign":
      return { ...state, singleCampaign: action.payload };
    case "searchCampaign":
      return { ...state, campaigns: action.payload };
    case "editCampaign":
      return {
        ...state,
        campaigns: state.campaigns.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "deleteCampaign":
      return {
        ...state,
        campaigns: state.campaigns.filter((c) => c.id !== action.payload.id),
      };
    default:
      return state;
  }
};
