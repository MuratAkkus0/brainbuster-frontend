import { MainContainer } from "@/components/atoms/MainContainer";
import { Header } from "@/components/molecules/Header";
import { Hero } from "@/components/molecules/Hero";

export const HomePageView = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Hero />
      </MainContainer>
    </>
  );
};
