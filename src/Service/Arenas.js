import apiClient from "./Cliente";
import Swal from "sweetalert2";

const getAll = async (id) => {
  try {
    const response = await apiClient.get("/arenas/" + id);

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);

    throw error;
  }
};

const createNewArena = async (payload) => {
  try {
    const response = await apiClient.post("/arenas/", payload);
    Swal.fire({
      title: "Success!",
      text: "Chaves criadas com sucesso!",
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

export { getAll, createNewArena };
