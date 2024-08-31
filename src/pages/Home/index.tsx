import TimetableViewerTabs from "@/components/Viewer/TimetableViewerTabs";

export default function HomePage() {
  return (
    <section className="flex justify-center w-full py-10">
      <div className="max-w-4xl p-4 border border-slate-200">
        <TimetableViewerTabs />
      </div>
    </section>
  );
}
