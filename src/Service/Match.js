import apiClient from "./Cliente";
import Swal from "sweetalert2";

const byId = async (id) => {
  try {
    const response = await apiClient.get("/match/" + id);

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);

    throw error;
  }
};

const generateKeys = async (payload) => {
  try {
    const response = await apiClient.post("/match/", payload);
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

const insertMatchInArena = async (payload, id) => {
  try {
    const response = await apiClient.post("/match/" + id, payload);
    Swal.fire({
      title: "Success!",
      text: "Evento atualizado com sucesso",
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

export { byId, generateKeys, insertMatchInArena };
