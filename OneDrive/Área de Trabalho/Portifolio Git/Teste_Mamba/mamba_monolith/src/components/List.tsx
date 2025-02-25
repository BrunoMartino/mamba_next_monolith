"use client";

import { useCampaigns } from "@/context/CampaignContext";
import { useEffect } from "react";

const ListCampaigns = () => {
  const { campaigns, setExpiredCampaigns } = useCampaigns() || {
    campaigns: [],
    setExpiredCampaigns: () => {},
  };

  useEffect(() => {
    setExpiredCampaigns();
  }, []);

  if (!campaigns || campaigns.length === 0) {
    return <p>Não há campanhas disponíveis.</p>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center uppercase">
        Campanhas
      </h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Criada em:
            </th>
            <th scope="col" className="px-6 py-3">
              Data Início
            </th>
            <th scope="col" className="px-6 py-3">
              Data Fim
            </th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">{campaign.id}</td>
              <td className="px-6 py-4">{campaign.category}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {campaign.name}
              </th>
              <td className="px-6 py-4">{campaign.status}</td>
              <td className="px-6 py-4">{campaign.dateInsert}</td>
              <td className="px-6 py-4">{campaign.dateInitial}</td>
              <td className="px-6 py-4">{campaign.dateEnd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCampaigns;
