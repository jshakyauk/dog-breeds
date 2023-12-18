import axios from "axios";

const API_BASE_URL = "https://dog.ceo/api";

export const getAllBreeds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/breeds/list/all`);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    throw error;
  }
};

export const getItemDetail = async (alias: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/breed/` + alias + `/images`
    );
    return response.data.message;
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    throw error;
  }
};
