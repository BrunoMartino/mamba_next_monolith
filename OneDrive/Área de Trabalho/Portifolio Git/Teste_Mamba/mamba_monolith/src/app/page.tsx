"use client";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Função para atualizar campanhas expiradas
  const expireCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns/expired-campaigns", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar campanhas expiradas");
      }
      const data = await response.json();
      console.log(data.message);
    } catch (err) {
      console.error("Erro ao expirar campanhas:", err);
      setError("Erro ao atualizar campanhas expiradas");
    }
  };

  // Função para buscar campanhas do banco de dados
  const getCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns");
      if (!response.ok) {
        throw new Error("Falha ao buscar campanhas");
      }
      return await response.json();
    } catch (err) {
      throw new Error("Erro ao buscar campanhas: " + err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await expireCampaigns(); // Primeiro expira as campanhas
        const data = await getCampaigns(); // Depois busca os dados atualizados
        setCampaigns(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <Header />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Categorias
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Criada em
              </th>
              <th scope="col" className="px-6 py-3">
                Início
              </th>
              <th scope="col" className="px-6 py-3">
                Final
              </th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{campaign.id}</td>
                <td className="px-6 py-4">{campaign.category}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {campaign.name}
                </th>
                <td className="px-6 py-4">{campaign.description}</td>
                <td className="px-6 py-4">{campaign.status}</td>
                <td className="px-6 py-4">{campaign.dateInsert}</td>
                <td className="px-6 py-4">{campaign.dateInitial}</td>
                <td className="px-6 py-4">{campaign.dateEnd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
