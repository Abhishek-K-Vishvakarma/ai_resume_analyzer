import API from "./api";

export const getAnalysis = async (
  analysisId: string
) => {
  const { data } = await API.get(
    `/analysis/${analysisId}`
  );

  return data;
};