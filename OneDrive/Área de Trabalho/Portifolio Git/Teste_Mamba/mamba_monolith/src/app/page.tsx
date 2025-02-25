"use client";

import ActionsMenu from "@/components/ActionsMenu";
import Header from "@/components/Header";
import ListCampaigns from "@/components/List";
import { CampaignProvider } from "@/context/CampaignContext";

const Home = () => {
  return (
    <CampaignProvider>
      <div className="container mx-auto bg-white dark:bg-black">
        <Header />
        <ActionsMenu />
        <ListCampaigns />
      </div>
    </CampaignProvider>
  );
};

export default Home;
