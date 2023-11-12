import apiClient from "./Cliente";
import Swal from "sweetalert2";

const createTournament = async (name, reward, date) => {
  const data = {
    owner_id: 1,
    name: name,
    data: date,
    reward: reward
  };
  try {
    const response = await apiClient.post("/tournament", data);
    Swal.fire({
      title: "Success!",
      text: "Evento criado com sucesso!",
      icon: "success",
      confirmButtonText: "Ok"
    });
    window.location.reload();
    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to create tournament.",
      icon: "error",
      confirmButtonText: "Ok"
    });
    throw error;
  }
};

const getAllTorunaments = async () => {
  try {
    const response = await apiClient.get("/tournament");

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);

    throw error;
  }
};

const getUserTournament = async () => {
  try {
    const response = await apiClient.get("/tournament/owner/1");

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);

    throw error;
  }
};

export { createTournament, getAllTorunaments, getUserTournament };
