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
    console.error(error);
    throw error;
  }
};

// 각 교실 수업 정보 가져오기
export const fetchSessions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions`);
    if (!response.ok) {
      throw new Error("수업 정보 가져오기 실패");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
