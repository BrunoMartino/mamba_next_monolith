"use client";

import { campaignReducer } from "@/reducers/campaignReducer";
import { Campaign } from "@prisma/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

interface CampaignContextProps {
  campaigns: Campaign[];
  theme: string;
  setTheme: (newTheme: string) => void;
  fetchCampaigns: () => Promise<void>;
  addCampaign: (campaign: Campaign) => Promise<void>;
  searchCampaigns: (query: string) => Promise<void>;
  editCampaign: (id: string, data: Partial<Campaign>) => Promise<void>;
  getSingleCampaign: (id: string) => Promise<Campaign | undefined>;
  removeCampaign: (id: string) => Promise<void>;
  setExpiredCampaigns: () => Promise<void>;
}

type Props = {
  children: ReactNode;
};

const STORAGE_KEY = "themeContextKey";

export const CampaignContext = createContext<CampaignContextProps | undefined>(
  undefined
);

export const CampaignProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(campaignReducer, {
    campaigns: [],
    singleCampaign: {} as Campaign,
  });
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    fetchCampaigns();
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setExpiredCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns/expired-campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok)
        throw new Error("Erro ao atualizar status das campanhas expiradas");

      fetchCampaigns();
    } catch (error) {
      console.error("Erro ao atualizar status das campanhas expiradas", error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns");
      const data = await res.json();
      dispatch({ type: "getAllCampaigns", payload: data });
    } catch (error) {
      console.error("Erro ao buscar campanhas", error);
    }
  };

  const addCampaign = async (campaign: Campaign) => {
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      });
      const newCampaign = await res.json();
      dispatch({ type: "addCampaign", payload: newCampaign });
    } catch (error) {
      console.error("Erro ao adicionar campanha", error);
    }
  };

  const editCampaign = async (id: string, data: Partial<Campaign>) => {
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updateCampaign = await res.json();
      dispatch({ type: "editCampaign", payload: updateCampaign });
    } catch (error) {
      console.error("Erro ao editar campanha", error);
    }
  };

  const removeCampaign = async (id: string) => {
    try {
      await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
      dispatch({ type: "deleteCampaign", payload: { id } });
    } catch (error) {
      console.error("Erro ao deletar campanha", error);
    }
  };

  const searchCampaigns = async (query: string) => {
    try {
      const res = await fetch(`/api/campaigns/search?q=${query}`);
      if (!res.ok) throw new Error("Erro ao buscar campanhas");

      const data: Campaign[] = await res.json();
      dispatch({ type: "searchCampaign", payload: data });
    } catch (error) {
      console.error("Não foi possivel encontrar a camapanha", error);
    }
  };

  const getSingleCampaign = async (id: string) => {
    try {
      const res = await fetch(`/api/campaigns/${id}`);
      if (!res.ok) throw new Error("Campanha não encontrada");
      const campaign = await res.json();
      dispatch({ type: "getSingleCampaign", payload: campaign });
      return campaign;
    } catch (error) {
      console.error("Erro ao buscar campanha", error);
      return undefined;
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        campaigns: state.campaigns,
        theme,
        setTheme,
        fetchCampaigns,
        addCampaign,
        editCampaign,
        removeCampaign,
        searchCampaigns,
        getSingleCampaign,
        setExpiredCampaigns,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => useContext(CampaignContext);
