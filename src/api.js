const API =
  "https://qa7.parentune.com/api/blog/blogs/v4/blog?itemId=11144";

export const getBlog = async () => {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return await response.json();
};