import apiClient from "./Cliente";
import Swal from "sweetalert2";

export const logIn = async (email, password) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    const token = response.data.token;
    
    // Salve o token no localStorage para autenticação persistente
    localStorage.setItem("authToken", token);
    Swal.fire("Sucesso", "Login realizado com sucesso!", "success");
    
    return token;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    Swal.fire("Erro", "Credenciais inválidas", "error");
    throw error;
  }
};

export const register = async (email, password, password_confirmation, name) => {
  try {
    await apiClient.post("/register", { email, password, password_confirmation, name });
    Swal.fire("Sucesso", "Cadastro realizado com sucesso!", "success");
  } catch (error) {
    console.error("Erro ao registrar:", error);
    Swal.fire("Erro", "Erro ao registrar o usuário", "error");
    throw error;
  }
};

export const logOut = async () => {
  try {
    const token = localStorage.getItem("authToken");
    await apiClient.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("authToken");
    Swal.fire("Sucesso", "Logout realizado com sucesso!", "success");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};
