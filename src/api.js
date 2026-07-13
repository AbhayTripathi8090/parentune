const API = process.env.REACT_APP_API_URL;

export const getBlog = async () => {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return await response.json();
};