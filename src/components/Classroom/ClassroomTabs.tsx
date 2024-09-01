import { useEffect, useState } from "react";
import { useClassroomStore } from "@/store/useClassroomStore";
import ClassroomTab from "./ClassroomTab";
import SchedulePanel from "./SchedulePanel";
import BatchButton from "./BatchButton";

export default function ClassroomTabs() {
  const { classrooms, getClassrooms, setActiveClassroomId, activeClassroomId } =
    useClassroomStore();
  const [activeTab, setActiveTab] = useState<number | null>(
    classrooms.length > 0 ? classrooms[0].id : null
  );

  const handleTabClick = (classroomId: number) => {
    setActiveTab(classroomId);
    setActiveClassroomId(classroomId);
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
      if (!activeClassroomId) {
        setActiveTab(classrooms[0].id);
        setActiveClassroomId(classrooms[0].id);
      } else {
        setActiveTab(activeClassroomId);
        setActiveClassroomId(activeClassroomId);
      }
    }
  }, [classrooms, setActiveClassroomId]);

  return (
    <div>
      <div className="flex justify-between items-center border-b border-b-slate-200">
        <div className="flex space-x-2">
          {classrooms.map((classroom) => (
            <ClassroomTab
              key={classroom.id}
              name={classroom.name}
              isActive={classroom.id === activeTab}
              onClick={() => handleTabClick(classroom.id)}
            />
          ))}
        </div>
        <BatchButton />
      </div>

      <div className="mt-2">
        {activeTab && <SchedulePanel activeTab={activeTab} />}
      </div>
    </div>
  );
}
