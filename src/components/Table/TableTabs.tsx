import { useClassroomStore } from "@/hooks/useClassroomStore";
import { useEffect, useState } from "react";
import TablePanel from "./TablePanel";
import TableTab from "./TableTab";

export default function TableTabs() {
  const { classrooms, fetchClassrooms } = useClassroomStore();
  const [activeTab, setActiveTab] = useState<number | null>(
    classrooms.length > 0 ? classrooms[0].id : null
  );

  const handleTabClick = (classroomId: number) => {
    setActiveTab(classroomId);
  };

  useEffect(() => {
    // 초기 데이터 로드
    const loadData = async () => {
      await fetchClassrooms();
    };

    loadData();
  }, [fetchClassrooms]);

  useEffect(() => {
    console.log(classrooms);
    if (classrooms.length > 0) {
      // 초기 활성화 탭 설정
      setActiveTab(classrooms[0].id);
    }
  }, [classrooms]);

  return (
    <div>
      <div className="flex">
        {classrooms.map((classroom) => (
          <TableTab
            key={classroom.id}
            name={classroom.name}
            isActive={classroom.id === activeTab}
            onClick={() => handleTabClick(classroom.id)}
          />
        ))}
      </div>
      <div className="mt-4">
        {activeTab && <TablePanel activeTab={activeTab} />}
      </div>
    </div>
  );
}
