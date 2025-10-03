import { Button } from "../ui/button";
import { Logo } from "../atoms/Logo";
import { Bubble } from "../atoms/Bubble";
import { Link } from "react-router";

export const Hero = () => {
  return (
    <>
      <div className="container sm:mx-2 h-full md:h-fit flex flex-col gap-3 sm:gap-4 md:gap-6 justify-center items-center bg-theme-dark-bg md:p-32 sm:rounded-4xl border-3 border-theme-dark-bg overflow-hidden relative">
        <Bubble />
        <div className="flex flex-col sm:gap-3 md:gap-4 items-center justify-center">
          <Logo />
          <div className="text-xl sm:text-2xl md:text-3xl text-theme-main-text">
            Test Yourself Now !
          </div>
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button
              size="lg"
              className="text-lg text-theme-dark-bg bg-accent cursor-pointer hover:bg-theme-accent"
            >
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button
              size="lg"
              className="text-lg text-theme-dark-bg bg-accent cursor-pointer hover:bg-theme-accent"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
