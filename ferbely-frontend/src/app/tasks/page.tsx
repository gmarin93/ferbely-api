import Header from "@/components/common/Header";
import TasksContent from "@/components/pages/TasksContent";

export default function Tasks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header title="Tasks" />
          <TasksContent />
        </div>
      </div>
    </div>
  );
}
