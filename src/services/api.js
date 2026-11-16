const BASE_URL = 'http://localhost:3000/api';

export const apiService = {
  async get(endpoint) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
         throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fallo en la petición:", error);
      throw error;
    }
  }
};