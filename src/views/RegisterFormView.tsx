import { ClassicPageLayout } from "@/components/atoms/ClassicPageLayout";
import { MainContainer } from "@/components/atoms/MainContainer";
import { Header } from "@/components/molecules/Header";
import { RegisterForm } from "@/components/molecules/RegisterForm";

export const RegisterFormView = () => {
  return (
    <ClassicPageLayout>
      <Header className="row-start-1 row-end-3" />
      <MainContainer className="row-start-3 row-end-13">
        <div className="w-full md:w-1/2 min-w-fit">
          <RegisterForm />
        </div>
      </MainContainer>
    </ClassicPageLayout>
  );
};
