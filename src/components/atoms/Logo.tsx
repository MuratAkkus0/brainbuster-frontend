export const Logo = () => {
  return (
    <div className="flex items-center justify-center max-w-fit max-h-fit p-2">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-theme-accent relative">
        <p className="[clip-path:polygon(0_0,100%_0,100%_40%,0_60%)] absolute -top-1 -left-1 ">
          <span>Brain</span>
          <span className="text-theme-main-text">Buster</span>
        </p>
        <p className="[clip-path:polygon(0_100%,100%_100%,100%_40%,0_60%)]">
          <span>Brain</span>
          <span className="text-theme-main-text">Buster</span>
        </p>
      </div>
    </div>
  );
};
