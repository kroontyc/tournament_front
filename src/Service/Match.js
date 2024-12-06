import apiClient from "./Cliente";
import Swal from "sweetalert2";

const byId = async (id) => {
  try {
    const response = await apiClient.get("/match/" + id);

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);
    return false;
    //throw error;
  }
};

const generateKeys = async (payload) => {
  try {
    const response = await apiClient.post("/match/", payload);
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

const insertMatchInArena = async (payload) => {
  try {
    const response = await apiClient.post("/save/match" , payload);
    Swal.fire({
      title: "Success!",
      text: "Evento atualizado com sucesso",
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

export const getRecoveryMatch = async(id) => {
  //console.log("id", id)
  try {
    let payload = {
      categorie: id
    }
    const response = await apiClient.post("/recovery/match/",payload);

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);
    return false;
    //throw error;
  }
}

export { byId, generateKeys, insertMatchInArena };
