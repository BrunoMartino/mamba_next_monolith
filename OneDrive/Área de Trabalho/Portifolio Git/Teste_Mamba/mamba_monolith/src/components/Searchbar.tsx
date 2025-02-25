"use client";

import { useCampaigns } from "@/context/CampaignContext";
import { useState } from "react";

const Searchbar = () => {
  const { searchCampaigns } = useCampaigns();
  const [query, setQuery] = useState<string>("");

  const handleSearch = async () => {
    if (query.trim()) {
      await searchCampaigns(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="block p-2.5 w-96 z-20 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Procure por NOME ou ID"
      />
      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm bg-blue-500 text-white p-2 rounded-lg"
      >
        Buscar
      </button>
    </div>
  );
};

export default Searchbar;
