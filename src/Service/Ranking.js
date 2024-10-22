import apiClient from "./Cliente";
import Swal from "sweetalert2";

export const byId = async (id) => {
  try {
    const response = await apiClient.get("/ranking/" + id);

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);

    throw error;
  }
};

export const removeById = async (id, tournament_id) => {
    try {
      let payload = {
        ranking_id: id,
        tournament_id: tournament_id
      };
      const response = await apiClient.post("/ranking/ranking", payload);
  
      return response.data;
    } catch (error) {
      // Handle error appropriately
      console.error("Error creating tournament:", error);
  
      throw error;
    }
  };

export const updateById = async (id, data) => {
  try {
    const response = await apiClient.put(`/ranking/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ranking:", error);
    throw error;
  }
};

export const addRanking = async (rankingData) => {
  try {
    const response = await apiClient.post("/ranking", rankingData);
    return response.data;
  } catch (error) {
    console.error("Error adding ranking:", error);
    throw error;
  }
};


