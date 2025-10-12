import { ClassicPageLayout } from "@/components/atoms/ClassicPageLayout";
import { MainContainer } from "@/components/atoms/MainContainer";
import { Header } from "@/components/molecules/Header";
import UserDashboard from "@/components/organisms/UserDashboard";

type Props = {};

export function UserDashboardView({}: Props) {
  return (
    <>
      <ClassicPageLayout>
        <Header className="row-start-1 row-end-3" />
        <MainContainer className="row-start-3 row-end-13 md:py-0 items-center">
          <UserDashboard />
        </MainContainer>
      </ClassicPageLayout>
    </>
  );
}
