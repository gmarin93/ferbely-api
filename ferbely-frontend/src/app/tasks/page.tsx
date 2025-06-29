import Header from "@/components/common/Header";
import TasksContent from "@/components/pages_content/TasksContent";
import { ButtonComponent } from "@/components/common/Button";
import { Plus } from "lucide-react";

export default function Tasks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header title="Tasks">
            <ButtonComponent createFor="tasks">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </ButtonComponent>
          </Header>
          <TasksContent />
        </div>
      </div>
    </div>
  );
}
