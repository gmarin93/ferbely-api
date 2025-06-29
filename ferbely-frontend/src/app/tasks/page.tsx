import Header from "@/components/common/Header";
import TasksContent from "@/components/pages_content/TasksContent";
import { ButtonComponent } from "@/components/common/Button";
import { Plus } from "lucide-react";
import { pageVariants, containerVariants } from "@/styles/variants";

export default function Tasks() {
  return (
    <div className={pageVariants()}>
      <div className={containerVariants()}>
        <Header title="Tasks">
          <ButtonComponent createFor="tasks">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </ButtonComponent>
        </Header>
        <TasksContent />
      </div>
    </div>
  );
}
