import apiClient from "./Cliente";
import Swal from "sweetalert2";

// Método para buscar pontuações pelo ID
export const getScoresById = async (id) => {
  try {
    const response = await apiClient.get("/scores");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pontuações:", error);
    Swal.fire("Erro", "Não foi possível carregar os dados", "error");
    throw error;
  }
};

// Método para adicionar nova pontuação
export const addRanking = async (newRanking) => {
  try {
    const response = await apiClient.post("/scores", newRanking);
    Swal.fire("Sucesso", "Pontuação adicionada com sucesso!", "success");
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar pontuação:", error);
    Swal.fire("Erro", "Não foi possível adicionar a pontuação", "error");
    throw error;
  }
};

// Método para remover pontuação pelo ID
export const removeById = async (id) => {
  try {
    await apiClient.delete("/scores/" + id);
    Swal.fire("Sucesso", "Pontuação removida com sucesso!", "success");
  } catch (error) {
    console.error("Erro ao remover pontuação:", error);
    Swal.fire("Erro", "Não foi possível remover a pontuação", "error");
    throw error;
  }
};
