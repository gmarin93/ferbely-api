import Header from "@/components/common/Header";
import DashboardContent from "@/components/pages_content/DashboardContent";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { pageVariants, containerVariants } from "@/styles/variants";
import { ButtonComponent } from "@/components/common/Button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className={pageVariants()}>
        <div className={containerVariants()}>
          <Header title="Dashboard">
            <ButtonComponent createFor="contracts">
              <Plus className="h-4 w-4 mr-2" />
              New Contract
            </ButtonComponent>
          </Header>
          <DashboardContent />
        </div>
      </div>.
    </ProtectedRoute>
  );
}
