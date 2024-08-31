import TimetableTabs from "@/components/Timetable/TimetableTabs";

export default function HomePage() {
  return (
    <section className="flex justify-center w-full py-10">
      <div className="max-w-4xl p-4 border border-slate-200">
        <TimetableTabs />
      </div>
    </section>
  );
}
