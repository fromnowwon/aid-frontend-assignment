import { useEffect, useState } from "react";
import { useClassroomStore } from "@/hooks/useClassroomStore";
import ClassroomTab from "./ClassroomTab";
import SchedulePanel from "./SchedulePanel";

export default function ClassroomTabs() {
  const { classrooms, loadClassrooms } = useClassroomStore();
  const [activeTab, setActiveTab] = useState<number | null>(
    classrooms.length > 0 ? classrooms[0].id : null
  );

  const handleTabClick = (classroomId: number) => {
    setActiveTab(classroomId);
  };

  useEffect(() => {
    // 초기 데이터 로드
    const loadData = async () => {
      await loadClassrooms();
    };

    loadData();
  }, [loadClassrooms]);

  useEffect(() => {
    if (classrooms.length > 0) {
      // 초기 활성화 탭 설정
      setActiveTab(classrooms[0].id);
    }
  }, [classrooms]);

  return (
    <div>
      <div className="flex">
        {classrooms.map((classroom) => (
          <ClassroomTab
            key={classroom.id}
            name={classroom.name}
            isActive={classroom.id === activeTab}
            onClick={() => handleTabClick(classroom.id)}
          />
        ))}
      </div>
      <div className="mt-4">
        {activeTab && <SchedulePanel activeTab={activeTab} />}
      </div>
    </div>
  );
}
