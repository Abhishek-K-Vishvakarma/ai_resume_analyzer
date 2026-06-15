import API from "./api";

export const getMyResumes = async () => {
    const { data } =
      await API.get(
        "/resume/my-resumes"
      );

    return data;
  };