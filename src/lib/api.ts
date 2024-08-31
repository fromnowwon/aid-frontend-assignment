import { Session } from "@/types/ClassroomTypes";

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
    const response = await fetch(`${API_BASE_URL}/mealTimes`);
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

// 교시 추가
export const addSession = async (
  classroomId: number,
  timeOfDay: string,
  startTime: string,
  endTime: string,
  sessionId: number
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/classrooms/${classroomId}/sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeOfDay,
          startTime,
          endTime,
          sessionId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("교시 추가에 실패했습니다.");
    }

    return await response.json();
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
      throw new Error("교시 삭제에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("API 요청 오류:", error);
    throw error;
  }
};

// 모든 교실 동일 시간표 적용
export const applySessionsToAll = async (sessions: Session[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/apply-sessions-to-all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessions }),
    });

    if (!response.ok) {
      throw new Error("모든 교실에 세션을 적용하는 데 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API 요청 오류:", error);
    throw error;
  }
};

// 교시 변경
export async function updateSession(
  classroomId: number,
  sessionId: number,
  startTime: string,
  endTime: string
) {
  const response = await fetch(
    `${API_BASE_URL}/classrooms/${classroomId}/sessions/${sessionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startTime, endTime }),
    }
  );

  if (!response.ok) {
    throw new Error("교시 수정 실패");
  }

  return response.json();
}

// 식사 시간 변경
export const updateMealTime = async (
  mealType: string,
  newTimes: { startTime: string; endTime: string }
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mealTimes/${mealType}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTimes),
    });

    if (!response.ok) {
      throw new Error("Failed to update meal times");
    }
  } catch (error) {
    console.error("API 요청 오류:", error);
    throw error;
  }
};
