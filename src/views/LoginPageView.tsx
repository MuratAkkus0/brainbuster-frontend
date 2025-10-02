import { MainContainer } from "@/components/atoms/MainContainer";
import { Header } from "@/components/molecules/Header";
import { LoginForm } from "@/components/molecules/LoginForm";
import React from "react";

export const LoginPageView = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <div className="w-full md:w-1/2 min-w-fit h-full">
          <div className="md:h-16"></div>
          <LoginForm />
        </div>
      </MainContainer>
    </>
  );
};
