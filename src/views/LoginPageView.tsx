import { ClassicPageLayout } from "@/components/atoms/ClassicPageLayout";
import { MainContainer } from "@/components/atoms/MainContainer";
import { Header } from "@/components/molecules/Header";
import { LoginForm } from "@/components/molecules/LoginForm";

export const LoginPageView = () => {
  return (
    <>
      <ClassicPageLayout>
        <Header className="row-start-1 row-end-3" />
        <MainContainer className="row-start-3 row-end-13">
          <div className="w-full md:w-1/2 min-w-fit">
            <LoginForm />
          </div>
        </MainContainer>
      </ClassicPageLayout>
    </>
  );
};
