import { useClassroomStore } from "@/hooks/useClassroomStore";
import { useEffect, useState } from "react";
import TimetablePanel from "./TimetablePanel";
import TimetableTab from "./TimetableTab";

export default function TimetableTabs() {
  const { classrooms, getClassrooms } = useClassroomStore();
  const [activeTab, setActiveTab] = useState<number | null>(
    classrooms.length > 0 ? classrooms[0].id : null
  );

  const handleTabClick = (classroomId: number) => {
    setActiveTab(classroomId);
  };

  useEffect(() => {
    // 초기 데이터 로드
    const loadData = async () => {
      await getClassrooms();
    };

    loadData();
  }, [getClassrooms]);

  useEffect(() => {
    if (classrooms.length > 0) {
      // 초기 활성화 탭 설정
      setActiveTab(classrooms[0].id);
    }
  }, [classrooms]);

  return (
    <div>
      <div className="flex items-center border-b border-b-slate-200">
        {classrooms.map((classroom) => (
          <TimetableTab
            key={classroom.id}
            name={classroom.name}
            isActive={classroom.id === activeTab}
            onClick={() => handleTabClick(classroom.id)}
          />
        ))}
      </div>
      <div className="mt-2">
        {activeTab && <TimetablePanel activeTab={activeTab} />}
      </div>
    </div>
  );
}
