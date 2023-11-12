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

export { createTournament };
