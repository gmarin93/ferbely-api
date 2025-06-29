import Header from "@/components/common/Header";
import BuildingsContent from "@/components/pages_content/BuildingsContent";
import { ButtonComponent } from "@/components/common/Button";
import { Plus } from "lucide-react";

export default function Buildings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header title="Buildings">
            <ButtonComponent createFor="buildings">
              <Plus className="h-4 w-4 mr-2" />
              New Building
            </ButtonComponent>
          </Header>
          <BuildingsContent />
        </div>
      </div>
    </div>
  );
} 