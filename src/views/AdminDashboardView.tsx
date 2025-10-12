import { ClassicPageLayout } from "@/components/atoms/ClassicPageLayout";
import { MainContainer } from "@/components/atoms/MainContainer";
import { Header } from "@/components/molecules/Header";
import AdminDashboard from "@/components/organisms/AdminDashboard";

export const AdminDashboardView = () => {
  return (
    <>
      <ClassicPageLayout>
        <Header className="row-start-1 row-end-3" />
        <MainContainer className="row-start-3 row-end-13 md:py-0 items-center">
          <AdminDashboard />
        </MainContainer>
      </ClassicPageLayout>
    </>
  );
};
