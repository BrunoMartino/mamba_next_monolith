import { useCampaigns } from "@/context/CampaignContext";
import { useState } from "react";

const ActionsMenu = () => {
  const { campaigns, searchCampaigns, setExpiredCampaigns } = useCampaigns();
  const [statusFilter, setStatusFilter] = useState<string>(""); // Filtro de status
  const [categoryFilter, setCategoryFilter] = useState<string>(""); // Filtro de categoria
  const [showCreateCampaign, setShowCreateCampaign] = useState<boolean>(false); // Controle do modal de criação

  // Função para aplicar os filtros
  const applyFilters = () => {
    let filteredCampaigns = campaigns;

    if (statusFilter) {
      filteredCampaigns = filteredCampaigns.filter((campaign) =>
        campaign.status.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filteredCampaigns = filteredCampaigns.filter((campaign) =>
        campaign.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    // Atualizar as campanhas com base nos filtros
    searchCampaigns(filteredCampaigns);
  };

  return (
    <div>
      <h1>Menu aqui</h1>

      <div className="flex gap-4">
        {/* Filtro de Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos os Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Expirado">Expirado</option>
        </select>

        {/* Filtro de Categoria */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todas as Categorias</option>
          <option value="Categoria 1">Categoria 1</option>
          <option value="Categoria 2">Categoria 2</option>
          <option value="Categoria 3">Categoria 3</option>
        </select>

        {/* Botão de Filtro */}
        <button
          onClick={applyFilters}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Filtrar
        </button>

        {/* Botão de Criar Campanha */}
        <button
          onClick={() => setShowCreateCampaign(true)}
          className="p-2 bg-green-500 text-white rounded"
        >
          Criar Campanha
        </button>
      </div>

      {/* Lógica para abrir o componente de criação de campanha */}
      {showCreateCampaign && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-semibold">Criar Nova Campanha</h2>
            {/* Aqui você pode colocar o componente de criação de campanha */}
            <button
              onClick={() => setShowCreateCampaign(false)}
              className="mt-4 p-2 bg-red-500 text-white rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsMenu;
