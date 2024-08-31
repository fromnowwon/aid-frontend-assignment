import { useState } from "react";
import { Pen } from "lucide-react";
import { MealTime } from "@/types/MealTimeTypes";
import { Button } from "@/components/ui/button";
import EditMealTimeModal from "@/components/Modals/EditMealTimeModal";
import { useClassroomStore } from "@/store/useClassroomStore";

interface MealTimeSessionProps {
  mealTime: MealTime;
  mealType: string;
}

export default function MealTimeSession({
  mealTime,
  mealType,
}: MealTimeSessionProps) {
  const mealTypeTitle = mealType === "lunch" ? "점심" : "저녁";

  const { classrooms, activeClassroomId } = useClassroomStore((state) => state);
  const classroom = classrooms.find(
    (classroom) => classroom.id === activeClassroomId
  );

  const [isEditMealTimeModalOpen, setEditMealTimeModalOpen] = useState(false);

  const openEditMealTimeModal = () => setEditMealTimeModalOpen(true);
  const closeEditMealTimeModal = () => setEditMealTimeModalOpen(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        <h4 className="text-sm font-semibold">{mealTypeTitle}</h4>
        <div>
          {mealTime.startTime} - {mealTime.endTime}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={openEditMealTimeModal}
          className="w-6 h-6"
        >
          <Pen className="w-4 h-4" />
        </Button>
      </div>

      {classroom && (
        <EditMealTimeModal
          isOpen={isEditMealTimeModalOpen}
          onClose={closeEditMealTimeModal}
          mealType={mealType}
          classroomId={classroom.id}
        />
      )}
    </>
  );
}
