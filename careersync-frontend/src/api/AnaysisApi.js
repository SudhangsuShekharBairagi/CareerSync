const baseUrl = "http://localhost:8080/api";

export const uploadResume = async (resumeFile) => {
  try {
    const formData = new FormData();

    formData.append("file", resumeFile);

    const res = await fetch(`${baseUrl}/resume/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage || "Resume upload failed");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Resume upload error:", error);
    throw error;
  }
};

export const getResumeHistory = async () => {
  try {
    const response = await fetch(`${baseUrl}/resume/history`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Failed to fetch resume history");
    }

    return await response.json();
  } catch (error) {
    console.error("Get resume history error:", error);
    throw error;
  }
};



export const getResumeAnalysisById = async (resumeId) => {
  try {
    const response = await fetch(
      `${baseUrl}/resume/${resumeId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Failed to fetch resume analysis");
    }

    return await response.json();
  } catch (error) {
    console.error("Get resume analysis error:", error);
    throw error;
  }
};