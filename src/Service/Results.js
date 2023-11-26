import apiClient from "./Cliente";
import Swal from "sweetalert2";

const createResult = async (payload) => {
  try {
    const response = await apiClient.post("/result/", payload);
    Swal.fire({
      title: "Success!",
      text: "Atualizado com sucesso!",
      icon: "success",
      confirmButtonText: "Ok",
      willClose: () => {
        window.location.reload(); // This will refresh the page
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Ocorreu um erro.",
      icon: "error",
      confirmButtonText: "Ok",
      willClose: () => {
        window.location.reload(); // This will refresh the page
      }
    });
    // Handle error appropriately
    console.error("Error creating tournament:", error);

    throw error;
  }
};

export { createResult };
