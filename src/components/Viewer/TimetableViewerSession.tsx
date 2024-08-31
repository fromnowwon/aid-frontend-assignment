import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Session } from "@/types/ClassroomTypes";

interface TimetableViewerSessionProps {
  sessions: Session[];
}

export default function TimetableViewerSession({
  sessions,
}: TimetableViewerSessionProps) {
  // 시간대 기준 그룹 생성
  const groupedSessions = sessions.reduce(
    (acc: Record<string, Session[]>, session) => {
      const { timeOfDay } = session;
      if (!acc[timeOfDay]) acc[timeOfDay] = [];
      acc[timeOfDay].push(session);
      return acc;
    },
    { morning: [], afternoon: [], evening: [] }
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>오전</TableHead>
          <TableHead>오후</TableHead>
          <TableHead>저녁</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            {groupedSessions.morning.length > 0 ? (
              groupedSessions.morning.map((session) => (
                <div key={session.sessionId} className="flex space-x-3">
                  <div>{session.sessionId}교시</div>
                  <div>
                    {session.startTime} - {session.endTime}
                  </div>
                </div>
              ))
            ) : (
              <div>수업 없음</div>
            )}
          </TableCell>
          <TableCell>
            {groupedSessions.afternoon.length > 0 ? (
              groupedSessions.afternoon.map((session) => (
                <div key={session.sessionId} className="flex space-x-3">
                  <div>{session.sessionId}교시</div>
                  <div>
                    {session.startTime} - {session.endTime}
                  </div>
                </div>
              ))
            ) : (
              <div>수업 없음</div>
            )}
          </TableCell>
          <TableCell>
            {groupedSessions.evening.length > 0 ? (
              groupedSessions.evening.map((session) => (
                <div key={session.sessionId} className="flex space-x-3">
                  <div>{session.sessionId}교시</div>
                  <div>
                    {session.startTime} - {session.endTime}
                  </div>
                </div>
              ))
            ) : (
              <div>수업 없음</div>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
