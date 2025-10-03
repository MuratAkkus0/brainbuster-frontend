export const Bubble = () => {
  return (
    <>
      <div className="max-w-fit max-h-fit bg-transparent absolute top-0 left-0 z-0">
        <div
          className={
            "size-48 -ml-[2.4rem] -mt-[2.4rem] border-8 rounded-full [clip-path:polygon(20%_20%,100%_20%,100%_100%,20%_100%)] bg-theme-accent border-theme-accent sm:bg-theme-accent sm:border-theme-dark-bg"
          }
        ></div>
      </div>
    </>
  );
};
