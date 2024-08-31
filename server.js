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

// 포트 설정
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
