const API_BASE_URL = "http://localhost:5000/api";

// 교실 정보 가져오기
export const fetchClassrooms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/classrooms`);
    if (!response.ok) {
      throw new Error("교실 정보 가져오기 실패");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API 요청 오류:", error);
    throw error;
  }
};

// 식사 시간 가져오기
export const fetchMealTimes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/meal-times`);
    if (!response.ok) {
      throw new Error("식사 시간 가져오기 실패");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API 요청 오류:", error);
    throw error;
  }
};

// 교시 삭제
export const removeSession = async (classroomId: number, sessionId: number) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/classrooms/${classroomId}/sessions/${sessionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete session");
    }

    return await response.json();
  } catch (error) {
    console.error("API 요청 오류:", error);
    throw error;
  }
};
