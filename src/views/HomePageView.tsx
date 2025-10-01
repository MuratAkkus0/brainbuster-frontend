export const HomePageView = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-[url('./assets/home-bg.png')]">
        <div className="flex flex-col gap-6 justify-center items-center bg-blue-600 p-32 rounded-4xl">
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-yellow-400">
              Brain<span className="text-white">Buster</span>
            </div>
            <div className="text-3xl text-white">Test Yourself Now !</div>
          </div>
          <div className="px-8 py-4 text-6xl font-bold rounded-full bg-white">
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};
