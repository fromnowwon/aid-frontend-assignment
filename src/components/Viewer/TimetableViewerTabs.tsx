import { useClassroomStore } from "@/hooks/useClassroomStore";
import { useEffect, useState } from "react";
import TimetableViewerPanel from "./TimetableViewerPanel";
import TimetableViewerTab from "./TimetableViewerTab";

export default function TimetableViewerTabs() {
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
          <TimetableViewerTab
            key={classroom.id}
            name={classroom.name}
            isActive={classroom.id === activeTab}
            onClick={() => handleTabClick(classroom.id)}
          />
        ))}
      </div>
      <div className="mt-2">
        {activeTab && <TimetableViewerPanel activeTab={activeTab} />}
      </div>
    </div>
  );
}
