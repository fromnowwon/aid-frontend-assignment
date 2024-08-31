import express from "express";
import bodyParser from "body-parser";
import { JSONFilePreset } from "lowdb/node";
import cors from "cors";

const db = await JSONFilePreset("db.json", { classrooms: [], mealTimes: {} });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB 초기화
await db.read();
db.data ||= {
  classrooms: [],
  mealTimes: {
    lunchTime: { startTime: "12:00", endTime: "13:00" },
    dinnerTime: { startTime: "18:00", endTime: "19:00" },
  },
};

// 모든 시간표 데이터 조회
app.get("/api/classrooms", async (req, res) => {
  await db.read();
  res.json(db.data.classrooms);
});

// 식사 시간 데이터 조회
app.get("/api/meal-times", async (req, res) => {
  await db.read();
  res.json(db.data.mealTimes);
});

// 교시 추가
app.post("/api/classrooms/:classroomId/sessions", async (req, res) => {
  const { classroomId } = req.params;
  const { timeOfDay, startTime, endTime, sessionId } = req.body;

  try {
    // 현재 교실의 데이터 가져오기
    const classroom = db.data.classrooms.find(
      (c) => c.id === parseInt(classroomId)
    );

    if (!classroom) {
      return res.status(404).json({ message: "해당 교실이 없습니다." });
    }

    // 기존과 같은 교시가 존재한다면 기존 교시부터 뒤에 위치한 교시들은 sessionId + 1 한다.
    classroom.sessions.forEach((session) => {
      if (session.sessionId >= sessionId) {
        session.sessionId += 1;
      }
    });

    // 새 교시 추가
    classroom.sessions.push({
      sessionId,
      timeOfDay,
      startTime,
      endTime,
    });

    await db.write();
    res.status(201).json({ message: "교시 추가 성공" });
  } catch (error) {
    console.error("교시 추가 실패: ", error);
    res.status(500).json({ message: "교시 추가 실패" });
  }
});

// 교시 삭제
app.delete(
  "/api/classrooms/:classroomId/sessions/:sessionId",
  async (req, res) => {
    const { classroomId, sessionId } = req.params;

    try {
      const classroom = db.data.classrooms.find(
        (c) => c.id === parseInt(classroomId)
      );
      if (!classroom) {
        return res.status(404).json({ message: "해당 교실이 없습니다." });
      }

      const sessions = classroom.sessions.filter(
        (s) => s.sessionId !== parseInt(sessionId)
      );

      // 교시 순서 재정렬, 아이디 재부여
      const updatedSessions = sessions
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .map((session, index) => ({
          ...session,
          sessionId: index + 1,
        }));

      classroom.sessions = updatedSessions;

      await db.write();
      res.status(200).json({ message: "수업 삭제 성공" });
    } catch (error) {
      console.error("수업 삭제 실패: ", error);
      res.status(500).json({ message: "수업 삭제 실패" });
    }
  }
);

// 포트 설정
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
