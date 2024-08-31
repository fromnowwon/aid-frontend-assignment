import ClassroomTabs from "@/components/Classroom/ClassroomTabs";
import MealTimePanel from "@/components/MealTime/MealTimePanel";

export default function TimetablePage() {
  return (
    <section className="flex justify-center w-full py-10">
      <div className="max-w-4xl p-4 border border-slate-200">
        <ClassroomTabs />
        <MealTimePanel />
      </div>
    </section>
  );
}
