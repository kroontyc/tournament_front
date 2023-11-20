import apiClient from "./Cliente";
import Swal from "sweetalert2";

const getAll = async (id) => {
  try {
    const response = await apiClient.get("/categories/" + id);

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);

    throw error;
  }
};

const createCategories = async (payload) => {
  try {
    const response = await apiClient.post("/categories/", payload);
    Swal.fire({
      title: "Success!",
      text: "Chaves criadas com sucesso!",
      icon: "success",
      confirmButtonText: "Ok"
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Ocorreu um erro.",
      icon: "error",
      confirmButtonText: "Ok"
    });
    // Handle error appropriately
    console.error("Error creating tournament:", error);

    throw error;
  }
};

export { getAll,createCategories };
