import Header from "@/components/common/Header";
import DashboardContent from "@/components/pages_content/DashboardContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header title="Dashboard">
           <div>
            
           </div>
          </Header>
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}
