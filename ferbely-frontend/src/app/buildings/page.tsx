import Header from "@/components/common/Header";
import BuildingsContent from "@/components/pages_content/BuildingsContent";
import { ButtonComponent } from "@/components/common/Button";
import { Plus } from "lucide-react";
import { pageVariants, containerVariants } from "@/styles/variants";

export default function Buildings() {
  return (
    <div className={pageVariants()}>
      <div className={containerVariants()}>
        <Header title="Buildings">
          <ButtonComponent createFor="buildings">
            <Plus className="h-4 w-4 mr-2" />
            New Building
          </ButtonComponent>
        </Header>
        <BuildingsContent />
      </div>
    </div>
  );
} 