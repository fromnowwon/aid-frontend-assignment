const API_BASE_URL = "http://localhost:5000";

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
    console.error("classrooms API 요청 오류:", error);
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
    console.error("meal-times API 요청 오류:", error);
    throw error;
  }
};
