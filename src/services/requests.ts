import axios from "axios";

export const fetchUsers = async (count: number = 10) => {
  try {
    const response = await axios.get(
      `https://randomuser.me/api/?results=${count}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
