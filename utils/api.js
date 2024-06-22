import axios from "axios";

export const getAllPollings = async (token) => {
  try {
    const response = await axios.get("http://localhost:3001/api/polling", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pollings:", error);
    throw error;
  }
};
