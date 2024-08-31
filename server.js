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

// 수업(교시) 삭제
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
