import Header from "@/components/common/Header";
import BuildingsContent from "@/components/pages/BuildingsContent";

export default function Buildings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header title="Buildings" />
          <BuildingsContent />
        </div>
      </div>
    </div>
  );
} 