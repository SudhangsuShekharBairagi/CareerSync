const baseUrl = "http://localhost:8080/api";

export const buildResume = async (description) => {
  try {
    const res = await fetch(`${baseUrl}/resume-builder/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ description }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || "Failed to generate resume");
    }

    return await res.json();
  } catch (error) {
    console.error("Build resume error:", error);
    throw error;
  }
};

export const getResumeBuilderHistory = async () => {
  try {
    const res = await fetch(`${baseUrl}/resume-builder/history`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || "Failed to fetch resume history");
    }

    return await res.json();
  } catch (error) {
    console.error("Get resume builder history error:", error);
    throw error;
  }
};

export const deleteResumeBuilder = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/resume-builder/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || "Failed to delete resume");
    }

    return await res.json();
  } catch (error) {
    console.error("Delete resume error:", error);
    throw error;
  }
};

export const clearResumeBuilderHistory = async () => {
  try {
    const res = await fetch(`${baseUrl}/resume-builder/all`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || "Failed to clear resume history");
    }

    return await res.json();
  } catch (error) {
    console.error("Clear resume history error:", error);
    throw error;
  }
};
