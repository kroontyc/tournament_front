import apiClient from "./Cliente";
import Swal from "sweetalert2";

const createTournament = async (name, reward, date, location, federation) => {
  const data = {
    owner_id: 1,
    name: name,
    data: date,
    reward: reward,
    location: location,
    federation: federation
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

const byId = async (id) => {
  try {
    const response = await apiClient.get("/tournament/" + id);

    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tournament:", error);

    throw error;
  }
};

const createUserManul = async (payload) => {
  try {
    const response = await apiClient.post("/participant", payload);
    Swal.fire({
      title: "Success!",
      text: "Participante Criado!",
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
      text: "Falha ao inserir participante.",
      icon: "error",
      confirmButtonText: "Ok"
    });
    throw error;
  }
};

const createByFile = async (id, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // 'file' é o nome do campo esperado pelo backend

    const response = await apiClient.post("/participant/file/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    Swal.fire({
      title: "Success!",
      text: "Participante Criado!",
      icon: "success",
      confirmButtonText: "Ok"
    });

    return response.data;
  } catch (error) {
    console.error("Error creating tournament:", error);
    Swal.fire({
      title: "Error!",
      text: "Falha ao inserir participante.",
      icon: "error",
      confirmButtonText: "Ok"
    });
    throw error;
  }
};

const byIdTournamentParticipant = async (id, page) => {
  try {
    const config = {
      headers: {}
    };

    // Se 'page' for fornecido, adiciona ao cabeçalho
    if (page) {
      config.headers["page"] = page;
    }

    const response = await apiClient.get("/participant/peoples/" + id, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching tournament participants:", error);
    throw error;
  }
};

const getParticipantById = async (id, page) => {
  try {
    const response = await apiClient.get("/participant/" + id);

    return response.data;
  } catch (error) {
    console.error("Error fetching tournament participants:", error);
    throw error;
  }
};

const updatePeople = async (payload, id) => {
  try {
    const response = await apiClient.post("/participant/" + id, payload);
    Swal.fire({
      title: "Success!",
      text: "Evento criado com sucesso!",
      icon: "success",
      confirmButtonText: "Ok"
    });
    //window.location.reload();
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

export {
  createTournament,
  getAllTorunaments,
  getUserTournament,
  byId,
  createUserManul,
  createByFile,
  byIdTournamentParticipant,
  updatePeople,
  getParticipantById
};
