import Header from "@/components/common/Header";
import DashboardContent from "@/components/pages_content/DashboardContent";
import { pageVariants, containerVariants } from "@/styles/variants";

export default function Home() {
  return (
    <div className={pageVariants()}>
      <div className={containerVariants()}>
        <Header title="Dashboard">
         <div>
          
         </div>
        </Header>
        <DashboardContent />
      </div>
    </div>
  );
}
