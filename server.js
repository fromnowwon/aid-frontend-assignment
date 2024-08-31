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
    lunch: { startTime: "12:00", endTime: "13:00" },
    dinner: { startTime: "18:00", endTime: "19:00" },
  },
};

// 모든 시간표 데이터 조회
app.get("/api/classrooms", async (req, res) => {
  await db.read();
  res.json(db.data.classrooms);
});

// 식사 시간 데이터 조회
app.get("/api/mealTimes", async (req, res) => {
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

// 모든 교실 동일 시간표 적용
app.post(`/api/apply-sessions-to-all`, async (req, res) => {
  const { sessions } = req.body;

  try {
    db.data.classrooms.forEach((classroom) => {
      classroom.sessions = [...sessions];
    });

    await db.write();
    res.status(200).json({ message: "동일 시간표 적용 성공" });
  } catch (error) {
    console.error("동일 시간표 적용 실패: ", error);
    res.status(500).json({ message: "동일 시간표 적용 실패" });
  }
});

// 교시 수정
app.patch(
  "/api/classrooms/:classroomId/sessions/:sessionId",
  async (req, res) => {
    const { classroomId, sessionId } = req.params;
    const { startTime, endTime } = req.body;

    try {
      const classroom = db.data.classrooms.find(
        (c) => c.id === parseInt(classroomId)
      );

      if (!classroom) {
        return res.status(404).json({ message: "해당 교실이 없습니다." });
      }

      const sessionIndex = classroom.sessions.findIndex(
        (s) => s.sessionId === parseInt(sessionId)
      );

      if (sessionIndex === -1) {
        return res.status(404).json({ message: "해당 교시가 없습니다." });
      }

      // 이전 교시 종료 시간 및 다음 교시 시작 시간 가져오기
      const prevSessionEndTime =
        sessionIndex > 0
          ? classroom.sessions[sessionIndex - 1].endTime
          : TIME_RANGES[classroom.sessions[sessionIndex].timeOfDay].start;

      const nextSessionStartTime =
        sessionIndex < classroom.sessions.length - 1
          ? classroom.sessions[sessionIndex + 1].startTime
          : TIME_RANGES[classroom.sessions[sessionIndex].timeOfDay].end;

      // 새 교시의 시간이 유효한지 확인
      if (
        startTime < prevSessionEndTime ||
        endTime > nextSessionStartTime ||
        startTime >= endTime
      ) {
        return res
          .status(400)
          .json({ message: "유효하지 않은 시간 범위입니다." });
      }

      // 교시 수정
      classroom.sessions[sessionIndex] = {
        ...classroom.sessions[sessionIndex],
        startTime,
        endTime,
      };

      await db.write();
      res.status(200).json({ message: "교시 수정 성공" });
    } catch (error) {
      console.error("교시 수정 실패: ", error);
      res.status(500).json({ message: "교시 수정 실패" });
    }
  }
);

// 식사 시간 변경
app.patch("/api/mealTimes/:mealType", async (req, res) => {
  const { mealType } = req.params;
  const { startTime, endTime } = req.body;

  try {
    const mealTimes = db.data.mealTimes;
    console.log(mealTimes);
    // if (!mealTimes[mealType]) {
    //   return res
    //     .status(404)
    //     .json({ message: "유효하지 않은 식사 시간입니다." });
    // }

    mealTimes[mealType] = { startTime, endTime };

    await db.write();
    res.status(200).json({ message: "식사 시간 업데이트 성공" });
  } catch (error) {
    console.error("식사 시간 업데이트 실패: ", error);
    res.status(500).json({ message: "식사 시간 업데이트 실패" });
  }
});

// 포트 설정
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
