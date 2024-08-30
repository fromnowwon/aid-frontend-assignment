import express from "express";
import bodyParser from "body-parser";
import { JSONFilePreset } from "lowdb/node";
import cors from "cors";

const db = await JSONFilePreset("db.json", { classrooms: [] });

const app = express();
app.use(bodyParser.json());

// DB 초기화
await db.read();
app.use(cors());
db.data ||= { classrooms: [] };

// 모든 데이터 조회
app.get("/classrooms", async (req, res) => {
  await db.read();
  res.json(db.data.classrooms);
});

// 포트 설정
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
