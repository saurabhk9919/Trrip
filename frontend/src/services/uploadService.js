import API from "./apiServices";
export const uploadDocument = async (formData) => {
  const response = await API.post(
    "/upload",
    formData
  );

  return response.data;
};
export const getHistory = async () => {
  const response = await API.get(
    "/upload/history"
  );
  return response.data;
};